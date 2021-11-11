import React from "react";

interface ChatMsgProps {
  msgContent: string;
  msgAuthor?: string | null;
}

const ChatMsg: React.FC<ChatMsgProps> = ({ msgContent, msgAuthor }) => {
  return (
    <div className={"ml-2 mb-1"}>
      {msgAuthor && (
        <div className={"font-semibold font-mono text-gray-100"}>
          {msgAuthor}:
        </div>
      )}
      <div className={"font-mono text-gray-100"}>{msgContent}</div>
    </div>
  );
};

export default ChatMsg;
