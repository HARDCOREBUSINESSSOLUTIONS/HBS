
import { useState, useRef, useCallback, useEffect } from 'react';
import { RealtimeChat } from '@/utils/RealtimeChat';
import { toast } from 'sonner';

export const useRealtimeChat = (setInput: (input: string) => void, options: { instructions?: string } = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const transcriptRef = useRef('');
  const chatRef = useRef<RealtimeChat | null>(null);
  const { instructions } = options;

  const handleMessage = (event: any) => {
    console.log("Received event:", event.type);
    
    if (event.type === 'response.audio_transcript.delta') {
      transcriptRef.current += event.delta;
      setInput(transcriptRef.current);
    } else if (event.type === 'response.audio_transcript.done') {
      // Clear transcript when response is complete
      transcriptRef.current = '';
    } else if (event.type === 'input_audio_buffer.speech_started') {
      console.log("User started speaking");
      setIsSpeaking(false); // Stop showing AI as speaking when user starts
    } else if (event.type === 'input_audio_buffer.speech_stopped') {
      console.log("User stopped speaking, committing audio buffer");
    } else if (event.type === 'response.audio.delta') {
      // AI is sending audio
      setIsSpeaking(true);
    } else if (event.type === 'response.audio.done') {
      // AI finished speaking
      setIsSpeaking(false);
    } else if (event.type === 'session.created') {
      console.log("Session created successfully");
      toast.success("Voice session established!");
    } else if (event.type === 'session.updated') {
      console.log("Session updated successfully");
    } else if (event.type === 'error') {
      console.error("Realtime API error:", event);
      toast.error(`Realtime Error: ${event.error?.message || event.message || 'Unknown error'}`);
      disconnect();
    } else if (event.type === 'response.created') {
      console.log("Response created, AI is processing");
    } else if (event.type === 'response.done') {
      console.log("Response completed");
      setIsSpeaking(false);
    }
  };

  const disconnect = useCallback(() => {
    console.log("Disconnecting voice chat...");
    
    if (chatRef.current) {
      chatRef.current.disconnect();
      chatRef.current = null;
    }
    
    if (isConnected || isConnecting) {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
      setInput('');
      transcriptRef.current = '';
      toast.info("Voice assistant disconnected.");
    }
  }, [isConnected, isConnecting, setInput]);

  const connect = useCallback(async () => {
    if (chatRef.current || isConnecting) {
      console.log("Already connecting or connected");
      return;
    }
    
    setIsConnecting(true);
    
    try {
      console.log("Starting voice connection...");
      toast.info("Connecting to voice assistant...");
      
      const chat = new RealtimeChat(handleMessage, setIsSpeaking);
      await chat.init(instructions);
      
      chatRef.current = chat;
      setIsConnected(true);
      setIsConnecting(false);
      
      console.log("Voice connection established");
      toast.success("Voice assistant connected! You can now speak.");
      
    } catch (error) {
      console.error("Connection failed:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(`Connection failed: ${errorMessage}`);
      
      setIsConnecting(false);
      disconnect();
    }
  }, [disconnect, instructions, isConnecting]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    isSpeaking,
    isConnecting,
    connect,
    disconnect,
  };
};
