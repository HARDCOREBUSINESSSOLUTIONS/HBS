
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
      const defaultInstructions = "You are Hardcore Dev Ops, a helpful AI assistant specializing in development and operations. You are direct and to the point, with a bit of a cyber-punk flair.";
      const { data: tokenData, error: tokenError } = await supabase.functions.invoke("openai-realtime-session", {
        body: { instructions: instructions || defaultInstructions }
      });

      if (tokenError) throw tokenError;
      
      const EPHEMERAL_KEY = tokenData.client_secret?.value;
      if (!EPHEMERAL_KEY) {
        throw new Error("Failed to get ephemeral token from OpenAI.");
      }

      this.pc = new RTCPeerConnection();

      this.pc.ontrack = e => {
        this.audioEl.srcObject = e.streams[0];
        e.track.onunmute = () => this.onSpeakingChange(true);
        e.track.onmute = () => this.onSpeakingChange(false);
      };

      this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.micStream.getTracks().forEach(track => this.pc!.addTrack(track, this.micStream!));

      this.dc = this.pc.createDataChannel("oai-events");
      this.dc.addEventListener("message", (e) => {
        const event = JSON.parse(e.data);
        this.onMessage(event);
      });

      const offer = await this.pc.createOffer();
      await this.pc.setLocalDescription(offer);

      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
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
        throw new Error(`SDP exchange failed: ${errorText}`);
      }

      const answer = {
        type: "answer" as RTCSdpType,
        sdp: await sdpResponse.text(),
      };
      
      await this.pc.setRemoteDescription(answer);
    } catch (error) {
      console.error("Error initializing chat:", error);
      this.disconnect();
      throw error;
    }
  }

  sendMessage(text: string) {
    if (!this.dc || this.dc.readyState !== 'open') {
      console.error('Data channel not ready for sending message.');
      return;
    }

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
    this.micStream?.getTracks().forEach(track => track.stop());
    this.dc?.close();
    this.pc?.close();
  }
}

