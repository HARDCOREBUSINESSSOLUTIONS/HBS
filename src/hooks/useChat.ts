import { useState, useRef, useEffect } from "react";
import OpenAI from 'openai';
import { toast } from "sonner";
import { Message } from "@/components/ChatMessage";

// --- DEV-ONLY: Hardcoded Keys ---
// WARNING: Do NOT use these in production. This is a major security risk.
// Your API key will be exposed to anyone visiting your site.
// Use a secure backend (like a Supabase Edge Function) to handle API calls.
const OPENAI_API_KEY: string = "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";
// This is now the default public-facing assistant
const DEFAULT_ASSISTANT_ID: string = "asst_hX6NQ7jnFaVB16Qohr5vyFVi";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for browser-side usage
});

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
    const warningToast = document.querySelector('[data-sonner-toast][data-type="warning"]');
    if (!warningToast) {
        toast.warning("Security Alert: API Key Exposed", {
          description: "This is for development testing only. Do not deploy with keys in frontend code.",
          duration: Infinity,
          dismissible: false,
        });
    }
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
        assistant_id: assistantId, // Use the configured assistantId
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
