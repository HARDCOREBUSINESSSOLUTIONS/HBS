
import React, { useState, useRef, useEffect } from "react";
import HardcoreButton from "@/components/HardcoreButton";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage, Message } from "@/components/ChatMessage";
import { Send, Loader } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import OpenAI from 'openai';
import { toast } from "sonner";

// --- DEV-ONLY: Hardcoded Keys ---
// WARNING: Do NOT use these in production. This is a major security risk.
// Your API key will be exposed to anyone visiting your site.
// Use a secure backend (like a Supabase Edge Function) to handle API calls.
const OPENAI_API_KEY: string = "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";
const ASSISTANT_ID: string = "asst_hX6NQ7jnFaVB16Qohr5vyFVi";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for browser-side usage
});

const Agent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hardcore Dev Ops online. How can I help you dominate your business operations today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    toast.warning("Security Alert: API Key Exposed", {
      description: "This is for development testing only. Do not deploy with keys in frontend code.",
      duration: Infinity,
      dismissible: false,
    });
  }, []);

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
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const currentThreadId = threadId ?? (await openai.beta.threads.create()).id;
      if (!threadId) {
        setThreadId(currentThreadId);
      }

      await openai.beta.threads.messages.create(currentThreadId, {
        role: "user",
        content: currentInput,
      });

      const run = await openai.beta.threads.runs.create(currentThreadId, {
        assistant_id: ASSISTANT_ID,
      });

      let runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);
      while (runStatus.status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 500));
        runStatus = await openai.beta.threads.runs.retrieve(currentThreadId, run.id);

        if (['failed', 'cancelled', 'expired'].includes(runStatus.status)) {
          throw new Error(`Run failed with status: ${runStatus.status}`);
        }
      }

      const threadMessages = await openai.beta.threads.messages.list(currentThreadId);
      const assistantResponse = threadMessages.data.find(
        (m) => m.run_id === run.id && m.role === "assistant"
      );

      if (assistantResponse && assistantResponse.content[0].type === 'text') {
        const assistantMessage: Message = {
          role: "assistant",
          content: assistantResponse.content[0].text.value.replace(/【\d+†source】/g, ''),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("No valid text response from assistant.");
      }
    } catch (error) {
      console.error("OpenAI API Error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(`Error: ${errorMessage}`);
      setMessages(prev => prev.slice(0, -1)); // Revert optimistic UI update
      setInput(currentInput);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex h-[calc(100vh-140px)] max-h-[900px] flex-col py-8">
      <h1 className="font-heading text-4xl text-center text-white mb-2">HARDCORE DEV OPS</h1>
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
            disabled={isLoading}
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
