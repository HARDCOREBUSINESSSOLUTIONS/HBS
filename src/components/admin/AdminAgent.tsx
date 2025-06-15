
import React from "react";
import { useChat } from "@/hooks/useChat";
import ChatDisplay from "@/components/agent/ChatDisplay";
import ChatInput from "@/components/agent/ChatInput";
import { useRealtimeChat } from "@/hooks/useRealtimeChat";

const ADMIN_ASSISTANT_ID = "asst_zv1abhoMXVC3qyfYbMxKf1Fi";

const T5_INSTRUCTIONS = `You are T5 – the Hardcore AI DevOps Assistant.

Operate as a tactical, server-side agent that automates the backend operations of a business.
Your tone is assertive, no-nonsense, and execution-focused. You operate across email, calendar,
Slack, social media, and internal pipelines.

You must:
- Understand business context (brand, tone, category, use case)
- Use voice commands when enabled (via Whisper)
- Communicate internally via Slack or DM
- Generate content based on tone + context
- Trigger automated workflows in response to events or uploads
- Always act as an internal business partner, not an external chatbot`;

const AdminAgent = () => {
  const {
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
  } = useChat({
    assistantId: ADMIN_ASSISTANT_ID,
    initialMessages: [
      {
        role: "assistant",
        content:
          "T5 Hardcore DevOps Assistant online. I manage internal operations. How can I assist?",
      },
    ],
  });

  // The internal agent is primarily text-based, but ChatInput expects voice props.
  // We can use useRealtimeChat and just not display the voice controls prominently.
  const { isConnected, isSpeaking, connect, disconnect } =
    useRealtimeChat(setInput, { instructions: T5_INSTRUCTIONS });

  return (
    <div
      className="flex flex-col h-full bg-deep-black/50 border border-hardcore-pink/20 p-4 rounded-lg"
      style={{ minHeight: "600px" }}
    >
      <h2 className="font-heading text-2xl text-hardcore-pink uppercase tracking-widest text-center mb-4">
        Internal Ops Agent
      </h2>
      <div className="flex flex-1 flex-col gap-4 overflow-hidden min-h-0">
        <ChatDisplay
          messages={messages}
          isLoading={isLoading || (isConnected && isSpeaking)}
          chatContainerRef={chatContainerRef}
        />
        <ChatInput
          input={input}
          setInput={setInput}
          file={file}
          setFile={setFile}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
          isConnected={isConnected}
          connect={connect}
          disconnect={disconnect}
        />
      </div>
    </div>
  );
};

export default AdminAgent;

