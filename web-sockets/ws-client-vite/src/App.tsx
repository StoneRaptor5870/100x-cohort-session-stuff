import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setSetMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("connected");
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      console.log("Received message:", message.data);
      setLatestMessage(message.data);
    };
    return () => {
      socket.close();
    };
  }, []);

  if (!socket) {
    return <div>Connecting to socket server...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "10px",
        alignItems: "center",
        width: "20%",
      }}
    >
      <input
        onChange={(e) => {
          setSetMessage(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          socket.send(message);
        }}
      >
        Send
      </button>
      <div>{latestMessage}</div>
    </div>
  );
}

export default App;
