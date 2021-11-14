import ChatPage from "./Components/ChatPage";

const App = ({}) => {
  const ws = new WebSocket("ws://192.168.3.11:4000");

  ws.addEventListener("open", () => {
    console.log("New Connection");
  });

  return (
    <div>
      <ChatPage />
    </div>
  );
};

export default App;
