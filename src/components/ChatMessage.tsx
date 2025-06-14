
import { Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message: { role, content } }: ChatMessageProps) => {
  const isUser = role === "user";
  return (
    <div
      className={cn(
        "flex items-start gap-4",
        isUser ? "justify-end" : ""
      )}
    >
      {!isUser && (
        <Avatar className="h-9 w-9 border border-hardcore-pink/50">
          <AvatarFallback className="bg-cyber-indigo text-hardcore-pink">
            <Bot size={20} />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-lg p-3 text-sm shadow-md whitespace-pre-wrap",
          isUser
            ? "bg-hardcore-pink text-white rounded-br-none"
            : "bg-cyber-indigo text-gray-200 rounded-bl-none border border-hardcore-pink/20"
        )}
      >
        {content}
      </div>
      {isUser && (
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-gray-600 text-gray-200">
            <User size={20} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
