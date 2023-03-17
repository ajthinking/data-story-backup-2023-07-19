import { useEffect, useState } from "react";
import { ServerClient } from "../ServerClient";

export const useDataStoryServer = (initialState: any, setAvailableNodes: any) => {
  const [server, setServer] = useState(initialState);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let socket: WebSocket | null = null;    

    const connect = () => {

      socket = new WebSocket("ws://localhost:3100"); // Replace with your server URL
      
      socket.onopen = () => {
        console.log("Connected to server!");

        const server = new ServerClient(socket)
        setServer(server)
        server.describe()
      };

      socket.onerror = (error) => {
        console.error("WebSocket error: ", error);
        setShowError(true);
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        setAvailableNodes(data.availableNodes)
      };
    };

    // ensure we are in the browser
    if (typeof window !== "undefined") {
      console.log("Connecting to server...")
      connect();
    }

    // Use an empty array as the second argument to ensure that the effect only runs once.
    // The cleanup function will close the WebSocket when the component unmounts.
    return () => {
      console.log("Unmounting socket")
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return [server, setServer, showError];
};