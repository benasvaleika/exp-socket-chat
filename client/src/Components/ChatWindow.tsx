import React from "react";
import { ChatMessage } from "../types";
import ChatMsg from "./ChatMsg";

interface ChatWindowProps {
  messages: ChatMessage[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  console.log(messages);
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
              msgAuthor={message.msgAuthor}
              msgContent={message.msgContent}
            />
          );
        })
      )}
    </div>
  );
};

export default ChatWindow;
