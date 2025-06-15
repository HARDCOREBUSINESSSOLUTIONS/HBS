import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Message } from "@/components/ChatMessage";
import { supabase } from "@/integrations/supabase/client";

// --- DEV-ONLY: Hardcoded Keys ---
// WARNING: Do NOT use these in production. This is a major security risk.
// Your API key will be exposed to anyone visiting your site.
// Use a secure backend (like a Supabase Edge Function) to handle API calls.
// This is now the default public-facing assistant
const DEFAULT_ASSISTANT_ID: string = "asst_hX6NQ7jnFaVB16Qohr5vyFVi";

interface UseChatOptions {
  assistantId?: string;
  initialMessages?: Message[];
}

export const useChat = (options: UseChatOptions = {}) => {
  const { 
    assistantId = DEFAULT_ASSISTANT_ID,
    initialMessages = [
      {
        role: "assistant",
        content: "Hardcore Dev Ops online. How can I help you dominate your business operations today?",
      },
    ]
  } = options;

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const formData = new FormData();
      formData.append('input', currentInput.trim() || `Attached file: ${currentFile?.name}`);
      formData.append('assistantId', assistantId);
      if (threadId) {
        formData.append('threadId', threadId);
      }
      if (currentFile) {
        toast.info(`Uploading ${currentFile.name}...`);
        formData.append('file', currentFile);
      }

      const { data, error } = await supabase.functions.invoke('openai-assistant-chat', {
        body: formData,
      });

      if (error) {
        throw error;
      }

      if (currentFile) {
        toast.success(`${currentFile.name} uploaded successfully!`);
      }

      const { assistantResponse, newThreadId } = data;
      
      if (newThreadId && !threadId) {
        setThreadId(newThreadId);
      }

      if (assistantResponse) {
        setMessages((prev) => [...prev, assistantResponse]);
      } else {
        setMessages((prev) => [...prev, {role: "assistant", content: "Processing complete."}]);
      }
    } catch (error) {
      console.error("Supabase Function Error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(`Error: ${errorMessage}`);
      setMessages(prev => prev.slice(0, -1)); // Revert optimistic UI update
      setInput(currentInput);
      setFile(currentFile); // Revert file selection on error
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    file,
    setFile,
    handleFileChange,
    handleSubmit,
    chatContainerRef,
    fileInputRef,
  };
};
