import { useState } from "react";
import Button from "./Button";
import ChatWindow from "./ChatWindow";
import InputField from "./InputField";
import { ChatMessage } from "../types";

function ChatPage() {
  const [currMsg, setCurrMsg] = useState("");
  const [userNameField, setUserNameField] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessageHandler = () => {
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
    const newArr = messages.concat(newMessage);
    setMessages(newArr);
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