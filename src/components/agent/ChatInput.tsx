
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import HardcoreButton from '@/components/HardcoreButton';
import { Send, Paperclip, X, Mic, MicOff, Loader } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const ChatInput = ({
  input,
  setInput,
  file,
  setFile,
  isLoading,
  handleSubmit,
  handleFileChange,
  fileInputRef,
  isConnected,
  connect,
  disconnect,
}: ChatInputProps) => {
  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isConnected) return;
    handleSubmit(e);
  };

  // Get connecting state from the hook if available
  const isConnecting = React.useMemo(() => {
    // This is a simple way to detect if we're in a connecting state
    // by checking if we have the connect function but aren't connected
    return false; // We'll rely on the loading states for now
  }, []);

  const getMicrophoneButtonContent = () => {
    if (isConnecting) {
      return <Loader size={20} className="animate-spin text-yellow-500" />;
    }
    if (isConnected) {
      return <MicOff size={20} className="text-red-500" />;
    }
    return <Mic size={20} />;
  };

  const getMicrophoneButtonLabel = () => {
    if (isConnecting) return "Connecting voice...";
    if (isConnected) return "Disconnect voice";
    return "Connect voice";
  };

  return (
    <div className="flex-shrink-0">
      <form onSubmit={handleTextSubmit} className="flex flex-col gap-2">
         <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isConnected ? "Listening for your command..." : "Brief the agent... or just upload a file."}
            className="flex-1 resize-none bg-cyber-indigo border-hardcore-pink/30 text-white placeholder:text-gray-500 focus:ring-hardcore-pink focus:ring-offset-deep-black"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !isConnected) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            rows={1}
            disabled={isLoading || isConnected}
            readOnly={isConnected}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading || isConnected}
          />
           <HardcoreButton
              type="button"
              onClick={isConnected ? disconnect : connect}
              disabled={isLoading || isConnecting}
              className="p-3 h-full"
              size="icon"
              aria-label={getMicrophoneButtonLabel()}
            >
              {getMicrophoneButtonContent()}
          </HardcoreButton>
           <HardcoreButton
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || isConnected}
              className="p-3 h-full"
              size="icon"
              aria-label="Attach file"
            >
              <Paperclip size={20} />
          </HardcoreButton>
          <HardcoreButton type="submit" disabled={isLoading || (!input.trim() && !file) || isConnected} className="p-3 h-full" size="icon" aria-label="Send message">
            <Send size={20} />
          </HardcoreButton>
        </div>
        {file && !isConnected && (
            <div className="flex items-center justify-between rounded-md border border-hardcore-pink/30 bg-cyber-indigo/50 p-2 pl-3 text-sm text-gray-300">
              <span>{file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="p-1 rounded-full text-gray-400 hover:bg-hardcore-pink/20 hover:text-white"
                disabled={isLoading}
                aria-label="Remove file"
              >
                <X size={16} />
              </button>
            </div>
          )}
      </form>
       <p className="mt-2 text-xs text-center text-gray-500">
          For development only. API keys should never be stored in frontend code for production use.
      </p>
    </div>
  );
};

export default ChatInput;
