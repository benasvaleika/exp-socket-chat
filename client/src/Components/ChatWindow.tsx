import React, { useEffect, useRef } from "react";
import { ChatMessage } from "../types";
import ChatMsg from "./ChatMsg";
import { v4 as uuidv4 } from "uuid";

interface ChatWindowProps {
  messages: ChatMessage[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  return (
    <div className={"border-2 h-2/3 mx-4 mt-4 overflow-y-auto flex flex-col"}>
      {messages.length === 0 ? (
        <div className={"font-semibold font-mono text-gray-100 ml-2"}>
          No Messages
        </div>
      ) : (
        messages.map((message) => {
          return (
            <ChatMsg
              key={uuidv4()}
              msgAuthor={message.sameAuthor ? null : message.msgAuthor}
              msgContent={message.msgContent}
            />
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
