import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import ChatWindow from "./ChatWindow";
import InputField from "./InputField";
import { ChatMessage } from "../types";

function ChatPage() {
  const [currMsg, setCurrMsg] = useState("");
  const [userNameField, setUserNameField] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // WebSocket reference
  const ws: any = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.3.11:4000");
    ws.current.addEventListener("open", () => {
      console.log("New Connection");
    });

    const wsCurrent = ws.current;

    return () => {
      wsCurrent.close();
    };
  }, []);

  if (ws.current) {
    ws.current.onmessage = (data: any) => {
      console.log(JSON.parse(data.data.toString()));
      const wsMessage = JSON.parse(data.data.toString());
      setMessages(messages.concat(wsMessage));
    };
  }

  const sendMessageHandler = async () => {
    let sameAuth = false;
    if (messages.length > 0) {
      if (messages[messages.length - 1].msgAuthor === userName) {
        sameAuth = true;
      }
    }

    const newMessage: ChatMessage = {
      msgAuthor: userName,
      msgContent: currMsg,
      sameAuthor: sameAuth,
    };

    if (ws.current) {
      ws.current.send(JSON.stringify(newMessage));
    }

    setMessages(messages.concat(newMessage));
    setCurrMsg("");
  };

  const setUsernameHandler = () => {
    setUserName(userNameField);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      if (!userName) {
        if (userNameField === "") {
          return;
        }
        setUsernameHandler();
      } else {
        if (currMsg === "") {
          return;
        }
        sendMessageHandler();
      }
    }
  };

  return (
    <div className={"h-screen"} onKeyPress={handleKeyPress} tabIndex={0}>
      <ChatWindow messages={messages} />
      {!userName ? (
        <div className="flex flex-col w-1/2">
          <InputField
            placeholder="Enter Username"
            value={userNameField}
            getText={(text) => setUserNameField(text)}
          />
          <Button text="Submit Username" onClick={() => setUsernameHandler()} />
        </div>
      ) : (
        <div className="flex flex-col w-1/2">
          <InputField
            placeholder="Enter Message"
            value={currMsg}
            getText={(text) => setCurrMsg(text)}
          />
          <Button text="Send Message" onClick={() => sendMessageHandler()} />
        </div>
      )}
    </div>
  );
}

export default ChatPage;
