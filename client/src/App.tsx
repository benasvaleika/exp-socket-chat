import { useState } from "react";
import Button from "./Components/Button";
import ChatWindow from "./Components/ChatWindow";
import InputField from "./Components/InputField";
import { ChatMessage } from "./types";

function App() {
  const [currMsg, setCurrMsg] = useState("");
  const [userNameField, setUserNameField] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessageHandler = () => {
    const newMessage: ChatMessage = {
      msgAuthor: userName,
      msgContent: currMsg,
    };
    const newArr = messages.concat(newMessage);
    setMessages(newArr);
    setCurrMsg("");
  };

  return (
    <div className={"h-screen"}>
      <ChatWindow messages={messages} />
      {!userName ? (
        <div className="flex flex-col w-1/2">
          <InputField
            placeholder="Enter Username"
            value={userNameField}
            getText={(text) => setUserNameField(text)}
          />
          <Button
            text="Submit Username"
            onClick={() => setUserName(userNameField)}
          />
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

export default App;
