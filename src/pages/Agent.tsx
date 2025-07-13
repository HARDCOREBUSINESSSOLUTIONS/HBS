
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
    isConnecting,
    connect,
    disconnect,
  } = useRealtimeChat(setInput);

  return (
    <div className="h-full flex flex-col">
      <div className="container mx-auto flex flex-1 flex-col gap-6 py-8 overflow-hidden">
        <div className="flex-shrink-0">
          <div className="flex flex-col items-center mb-4">
            <img 
              src="/lovable-uploads/33d76d56-7b09-46d4-a478-bacc61aeb259.png" 
              alt="Hardcore Business Solutions Logo" 
              className="w-16 h-16 mb-4"
            />
            <DidAvatar isSpeaking={isSpeaking} />
          </div>
          <h1 className="font-heading text-4xl text-center text-white mt-4">HARDCORE DEV OPS</h1>
          <p className="text-center text-gray-400">Talk to the machine. Upload a file for analysis.</p>
          {isConnecting && (
            <p className="text-center text-yellow-400 mt-2">🔄 Connecting to voice assistant...</p>
          )}
          {isConnected && (
            <p className="text-center text-green-400 mt-2">🎤 Voice assistant active - speak now</p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-hidden min-h-0">
          <ChatDisplay
            messages={messages}
            isLoading={isLoading || isConnecting || (isConnected && isSpeaking)}
            chatContainerRef={chatContainerRef}
          />
          <ChatInput
            input={input}
            setInput={setInput}
            file={file}
            setFile={setFile}
            isLoading={isLoading || isConnecting}
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
