
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import HardcoreButton from '@/components/HardcoreButton';
import { Send, Paperclip, X } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
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
}: ChatInputProps) => {
  return (
    <div className="flex-shrink-0">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
         <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Brief the agent... or just upload a file."
            className="flex-1 resize-none bg-cyber-indigo border-hardcore-pink/30 text-white placeholder:text-gray-500 focus:ring-hardcore-pink focus:ring-offset-deep-black"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any); // Form submit on Enter
              }
            }}
            rows={1}
            disabled={isLoading}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
          />
           <HardcoreButton
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="p-3 h-full"
              size="icon"
              aria-label="Attach file"
            >
              <Paperclip size={20} />
          </HardcoreButton>
          <HardcoreButton type="submit" disabled={isLoading || (!input.trim() && !file)} className="p-3 h-full" size="icon" aria-label="Send message">
            <Send size={20} />
          </HardcoreButton>
        </div>
        {file && (
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
