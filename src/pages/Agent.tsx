
import React from "react";
import DidAvatar from "@/components/DidAvatar";
import { useChat } from "@/hooks/useChat";
import ChatDisplay from "@/components/agent/ChatDisplay";
import ChatInput from "@/components/agent/ChatInput";
import { useRealtimeChat } from "@/hooks/useRealtimeChat";

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

  const {
    isConnected,
    isSpeaking,
    connect,
    disconnect,
  } = useRealtimeChat(setInput);

  return (
    <div className="h-full flex flex-col">
      <div className="container mx-auto flex flex-1 flex-col gap-6 py-8 overflow-hidden">
        <div className="flex-shrink-0">
          <DidAvatar isSpeaking={isSpeaking} />
          <h1 className="font-heading text-4xl text-center text-white mt-4">HARDCORE DEV OPS</h1>
          <p className="text-center text-gray-400">Talk to the machine. Upload a file for analysis.</p>
        </div>

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
    </div>
  );
};
export default Agent;
