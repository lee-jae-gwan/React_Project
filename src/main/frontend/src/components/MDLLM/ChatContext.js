import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (msg) => setMessages((prev) => [...prev, msg]);

  return <ChatContext.Provider value={{ messages, addMessage }}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
