
import { useState, useRef, useCallback, useEffect } from 'react';
import { RealtimeChat } from '@/utils/RealtimeChat';
import { toast } from 'sonner';

export const useRealtimeChat = (setInput: (input: string) => void) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const transcriptRef = useRef('');
  const chatRef = useRef<RealtimeChat | null>(null);

  const handleMessage = (event: any) => {
    if (event.type === 'response.audio_transcript.delta') {
      transcriptRef.current += event.delta;
      setInput(transcriptRef.current);
    } else if (event.type === 'response.audio_transcript.done') {
      // You could add the final transcript to the chat messages here
      transcriptRef.current = '';
    } else if (event.type === 'error') {
      toast.error(`Realtime Error: ${event.message}`);
      disconnect();
    }
  };

  const disconnect = useCallback(() => {
    if (chatRef.current) {
      chatRef.current.disconnect();
      chatRef.current = null;
    }
    if (isConnected) {
      setIsConnected(false);
      setIsSpeaking(false);
      setInput('');
      transcriptRef.current = '';
      toast.info("Voice assistant disconnected.");
    }
  }, [isConnected, setInput]);

  const connect = useCallback(async () => {
    if (chatRef.current) return;
    
    try {
      toast.info("Connecting to voice assistant...");
      const chat = new RealtimeChat(handleMessage, setIsSpeaking);
      await chat.init();
      chatRef.current = chat;
      setIsConnected(true);
      toast.success("Voice assistant connected!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(`Connection failed: ${errorMessage}`);
      console.error(error);
      disconnect();
    }
  }, [disconnect]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    isSpeaking,
    connect,
    disconnect,
  };
};
