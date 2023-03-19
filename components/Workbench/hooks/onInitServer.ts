import { ServerClient } from "../ServerClient";

export const onInitServer = () => {
  let socket: WebSocket | null = null;    

  const connect = () => {
    socket = new WebSocket("ws://localhost:3100"); // Replace with your server URL
    
    socket.onopen = () => {
      console.log("Connected to server!");

      const server = new ServerClient(socket!)
      
      server.describe()
    };

    socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
    };
  };

  // ensure we are in the browser
  if (typeof window !== "undefined") {
    console.log("Connecting to server...")
    connect();
  }

  // Use an empty array as the second argument to ensure that the effect only runs once.
  // The cleanup function will close the WebSocket when the component unmounts.
  // return () => {
  //   console.log("Unmounting socket")
  //   if (socket) {
  //     socket.close();
  //   }
  // };
};