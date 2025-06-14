import React, { useState, useRef, useEffect } from "react";
import HardcoreButton from "@/components/HardcoreButton";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage, Message } from "@/components/ChatMessage";
import { Send, Loader } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// --- DEV-ONLY: Hardcoded Keys ---
// WARNING: Do NOT use these in production. These should be moved to a secure
// backend environment and accessed via an API endpoint.
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";
const ASSISTANT_ID = "YOUR_ASSISTANT_ID_HERE";

const Agent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Agent online. How can I help you dominate your business operations today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // --- FRONTEND-ONLY MOCK ---
    // This simulates an API call. Replace this with your actual backend logic.
    // You will need to make a request to your server, which then securely
    // calls the OpenAI Assistant API using your key and Assistant ID.
    console.log("--- Mock API Call ---");
    console.log("Using API Key:", OPENAI_API_KEY === "YOUR_OPENAI_API_KEY_HERE" ? "Placeholder (Update Me!)" : "Set");
    console.log("Using Assistant ID:", ASSISTANT_ID === "YOUR_ASSISTANT_ID_HERE" ? "Placeholder (Update Me!)" : "Set");
    console.log("Message to send:", userMessage.content);
    
    setTimeout(() => {
      const assistantResponse: Message = {
        role: "assistant",
        content: `This is a mocked response for: "${userMessage.content}".\n\nConnect your backend to get a real answer from the AI agent.`,
      };
      setMessages((prev) => [...prev, assistantResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto flex h-[calc(100vh-140px)] max-h-[900px] flex-col py-8">
      <h1 className="font-heading text-4xl text-center text-white mb-2">LIVE AGENT</h1>
      <p className="text-center text-gray-400 mb-6">Talk to the machine.</p>

      <div className="flex-1 overflow-y-auto rounded-lg border border-hardcore-pink/20 bg-cyber-indigo/50 p-4" ref={chatContainerRef}>
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

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Brief the agent on your next target..."
            className="flex-1 resize-none bg-cyber-indigo border-hardcore-pink/30 text-white placeholder:text-gray-500 focus:ring-hardcore-pink focus:ring-offset-deep-black"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any); // Form submit on Enter
              }
            }}
            rows={1}
          />
          <HardcoreButton type="submit" disabled={isLoading || !input.trim()}>
            <Send size={20} />
          </HardcoreButton>
        </form>
         <p className="mt-2 text-xs text-center text-gray-500">
            For development only. API keys should never be stored in frontend code for production use.
        </p>
      </div>
    </div>
  );
};
export default Agent;
