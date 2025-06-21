
import { supabase } from "@/integrations/supabase/client";

export class RealtimeChat {
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private audioEl: HTMLAudioElement;
  private micStream: MediaStream | null = null;

  constructor(
    private onMessage: (message: any) => void,
    private onSpeakingChange: (isSpeaking: boolean) => void
  ) {
    this.audioEl = document.createElement("audio");
    this.audioEl.autoplay = true;
  }

  async init(instructions?: string) {
    try {
      console.log("Initializing RealtimeChat...");
      
      // First, request microphone permission
      console.log("Requesting microphone access...");
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Microphone access granted");
      } catch (micError) {
        console.error("Microphone access denied:", micError);
        throw new Error("Microphone access is required for voice chat. Please allow microphone access and try again.");
      }

      const defaultInstructions = "You are Hardcore Dev Ops, a helpful AI assistant specializing in development and operations. You are direct and to the point, with a bit of a cyber-punk flair.";
      
      console.log("Getting ephemeral token...");
      const { data: tokenData, error: tokenError } = await supabase.functions.invoke("openai-realtime-session", {
        body: { instructions: instructions || defaultInstructions }
      });

      if (tokenError) {
        console.error("Token error:", tokenError);
        throw new Error(`Failed to get session token: ${tokenError.message}`);
      }
      
      console.log("Token response:", tokenData);
      
      const EPHEMERAL_KEY = tokenData.client_secret?.value;
      if (!EPHEMERAL_KEY) {
        console.error("No ephemeral key in response:", tokenData);
        throw new Error("Failed to get ephemeral token from OpenAI.");
      }

      console.log("Creating RTCPeerConnection...");
      this.pc = new RTCPeerConnection();

      this.pc.ontrack = e => {
        console.log("Received audio track");
        this.audioEl.srcObject = e.streams[0];
        e.track.onunmute = () => {
          console.log("Audio track unmuted - AI is speaking");
          this.onSpeakingChange(true);
        };
        e.track.onmute = () => {
          console.log("Audio track muted - AI stopped speaking");
          this.onSpeakingChange(false);
        };
      };

      this.pc.onconnectionstatechange = () => {
        console.log("Connection state:", this.pc?.connectionState);
      };

      this.pc.oniceconnectionstatechange = () => {
        console.log("ICE connection state:", this.pc?.iceConnectionState);
      };

      console.log("Getting user media...");
      this.micStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      console.log("Adding audio track to peer connection...");
      this.micStream.getTracks().forEach(track => {
        if (this.pc && this.micStream) {
          this.pc.addTrack(track, this.micStream);
        }
      });

      console.log("Creating data channel...");
      this.dc = this.pc.createDataChannel("oai-events");
      this.dc.addEventListener("message", (e) => {
        try {
          const event = JSON.parse(e.data);
          console.log("Received message:", event.type);
          this.onMessage(event);
        } catch (parseError) {
          console.error("Error parsing message:", parseError);
        }
      });

      this.dc.addEventListener("open", () => {
        console.log("Data channel opened");
      });

      this.dc.addEventListener("error", (error) => {
        console.error("Data channel error:", error);
      });

      console.log("Creating offer...");
      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      
      console.log("Sending SDP to OpenAI...");
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp"
        },
      });

      if (!sdpResponse.ok) {
        const errorText = await sdpResponse.text();
        console.error("SDP exchange failed:", errorText);
        throw new Error(`SDP exchange failed: ${errorText}`);
      }

      const answerSdp = await sdpResponse.text();
      console.log("Received answer SDP");
      
      const answer = {
        type: "answer" as RTCSdpType,
        sdp: answerSdp,
      };
      
      await this.pc.setRemoteDescription(answer);
      console.log("WebRTC connection established successfully!");

    } catch (error) {
      console.error("Error initializing chat:", error);
      this.disconnect();
      throw error;
    }
  }

  sendMessage(text: string) {
    if (!this.dc || this.dc.readyState !== 'open') {
      console.error('Data channel not ready for sending message. State:', this.dc?.readyState);
      return;
    }

    console.log("Sending text message:", text);
    const event = {
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'user',
        content: [{ type: 'input_text', text }]
      }
    };

    this.dc.send(JSON.stringify(event));
    this.dc.send(JSON.stringify({type: 'response.create'}));
  }

  disconnect() {
    console.log("Disconnecting RealtimeChat...");
    
    if (this.micStream) {
      this.micStream.getTracks().forEach(track => {
        track.stop();
        console.log("Stopped microphone track");
      });
      this.micStream = null;
    }
    
    if (this.dc) {
      this.dc.close();
      this.dc = null;
    }
    
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
    
    this.onSpeakingChange(false);
    console.log("RealtimeChat disconnected");
  }
}
