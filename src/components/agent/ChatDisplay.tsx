
import React from 'react';
import { ChatMessage, Message } from "@/components/ChatMessage";
import { Loader } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatDisplayProps {
  messages: Message[];
  isLoading: boolean;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const ChatDisplay = ({ messages, isLoading, chatContainerRef }: ChatDisplayProps) => {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto rounded-lg border border-hardcore-pink/20 bg-cyber-indigo/50 p-4" ref={chatContainerRef}>
      <div className="flex flex-col gap-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-4">
              <Avatar className="h-9 w-9 border border-hardcore-pink/50">
                  <AvatarFallback className="bg-cyber-indigo text-hardcore-pink">
                      <Loader className="animate-spin" size={20} />
                  </AvatarFallback>
              </Avatar>
              <div className="max-w-[75%] rounded-lg p-3 text-sm shadow-md bg-cyber-indigo text-gray-400 rounded-bl-none border border-hardcore-pink/20">
                  Thinking...
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDisplay;
