
import React, { useState, useRef, useEffect } from "react";
import HardcoreButton from "@/components/HardcoreButton";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage, Message } from "@/components/ChatMessage";
import { Send, Loader, Paperclip, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import OpenAI from 'openai';
import { toast } from "sonner";
import DidAvatar from "@/components/DidAvatar";

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
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // OpenAI has a 512MB file size limit. We'll set a more reasonable 20MB limit here.
      if (selectedFile.size > 20 * 1024 * 1024) {
        toast.error("File size cannot exceed 20MB.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((!input.trim() && !file) || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    const currentFile = file;
    setInput("");
    setFile(null);
    setIsLoading(true);

    try {
      let fileId: string | null = null;
      if (currentFile) {
        toast.info(`Uploading ${currentFile.name}...`);
        const openaiFile = await openai.files.create({
          file: currentFile,
          purpose: 'assistants',
        });
        fileId = openaiFile.id;
        toast.success(`${currentFile.name} uploaded successfully!`);
      }

      const currentThreadId = threadId ?? (await openai.beta.threads.create()).id;
      if (!threadId) {
        setThreadId(currentThreadId);
      }
      
      const messageData: OpenAI.Beta.Threads.Messages.MessageCreateParams = {
        role: 'user',
        // Provide default content if only a file is sent
        content: currentInput.trim() || `Attached file: ${currentFile?.name}`,
      };
      
      if (fileId) {
        messageData.attachments = [{ file_id: fileId, tools: [{ type: "file_search" }] }];
      }

      await openai.beta.threads.messages.create(currentThreadId, messageData);

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
        // If there's no text response, maybe there's just an action.
        // For now, we'll consider it an incomplete response.
        setMessages((prev) => [...prev, {role: "assistant", content: "Processing complete."}]);
      }
    } catch (error) {
      console.error("OpenAI API Error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(`Error: ${errorMessage}`);
      setMessages(prev => prev.slice(0, -1)); // Revert optimistic UI update
      setInput(currentInput);
      setFile(currentFile); // Revert file selection on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex h-[calc(100vh-140px)] max-h-[900px] flex-col py-8">
      <DidAvatar />
      <h1 className="font-heading text-4xl text-center text-white mt-4">HARDCORE DEV OPS</h1>
      <p className="text-center text-gray-400 mb-6">Talk to the machine. Upload a file for analysis.</p>

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

      <div className="mt-6">
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
    </div>
  );
};
export default Agent;
