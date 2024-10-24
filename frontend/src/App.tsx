import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [newmessage, setNewMessage] = useState();
  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send("Hello Server!");
    };
    newSocket.onmessage = message => {
      console.log("Message received:", message.data);
      setNewMessage(message.data);
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return <>hi there {newmessage}</>;
}

export default App;
