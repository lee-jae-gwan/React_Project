import React from "react";
import ChatWindow from "../components/MDLLM/ChatWindow";

function ChatLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 text-xl font-semibold">
          💬 sLLM RAG 챗봇 (UI Prototype)
        </div>
        <ChatWindow />
      </div>
    </div>
  );
}

export default ChatLayout;
