
import React from "react";
import DidAvatar from "@/components/DidAvatar";
import { useChat } from "@/hooks/useChat";
import ChatDisplay from "@/components/agent/ChatDisplay";
import ChatInput from "@/components/agent/ChatInput";

const Agent = () => {
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
  } = useChat();

  return (
    <div className="container mx-auto flex h-[calc(100vh-140px)] max-h-[900px] flex-col gap-6 py-8">
      <div className="flex-shrink-0">
        <DidAvatar />
        <h1 className="font-heading text-4xl text-center text-white mt-4">HARDCORE DEV OPS</h1>
        <p className="text-center text-gray-400">Talk to the machine. Upload a file for analysis.</p>
      </div>

      <ChatDisplay
        messages={messages}
        isLoading={isLoading}
        chatContainerRef={chatContainerRef}
      />

      <div className="flex-shrink-0">
        <ChatInput
          input={input}
          setInput={setInput}
          file={file}
          setFile={setFile}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
        />
      </div>
    </div>
  );
};
export default Agent;
