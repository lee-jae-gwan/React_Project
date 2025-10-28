import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useChat } from "./ChatContext";
import { useMaterialUIController, setOpenChat } from "context";
import MDButton from "components/MDButton";
import axios from "axios";

function ChatWindow() {
  const [controller, dispatch] = useMaterialUIController();
  const { openChat } = controller;
  const { messages, addMessage } = useChat();
  const wrapperRef = useRef();

  const handleSend = async (text) => {
    const newMessage = { role: "user", content: text };
    addMessage(newMessage);

    try {
      const res = await axios.post("/api/chat", { message: text });
      const aiReply = { role: "assistant", content: res.data.reply };
      addMessage(aiReply);
    } catch (error) {
      console.error(error);
      const aiReply = {
        role: "assistant",
        content: "죄송합니다. 답변을 가져오는 도중 오류가 발생했습니다.",
      };
      addMessage(aiReply);
    }
  };
  const handleClose = () => setOpenChat(dispatch, false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key == "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!openChat) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        width: "50%",
        height: "32rem",
        backgroundColor: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        borderRadius: "0.5rem",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        <span style={{ fontWeight: "bold" }}>GeoLLM Chat</span>
        <MDButton
          variant="outlined"
          color="dark"
          size="small"
          onClick={() => setOpenChat(dispatch, false)}
          sx={{ minWidth: "60px" }}
        >
          닫기
        </MDButton>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem" }}>
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} role={msg.role} content={msg.content} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default ChatWindow;
