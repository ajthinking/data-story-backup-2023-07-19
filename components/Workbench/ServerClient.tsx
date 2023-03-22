import { shallow } from 'zustand/shallow';
import { useStore } from './store';

export class ServerClient {
  private socket: WebSocket;

  constructor(
    socket: WebSocket,
    setAvailableNodes: any,
    updateEdgeCounts: any,
  ) {
    // Register the socket
    this.socket = socket

    // Register on open
    socket.onopen = () => {
      console.log("Connected to server!");

      socket.send(JSON.stringify({
        type: "describe"
      }))
    };

    // Register on close
    socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    socket.onmessage = ((data) => {
      const parsed = JSON.parse(data.data)

      if (parsed.type === "describeResponse") {
        setAvailableNodes(parsed.availableNodes)
        return;
      }

      if (parsed.type === "executionUpdate") {
        console.log("Received executionUpdate from server: ", parsed)

        updateEdgeCounts(parsed.counts)
        return;
      }

      console.log(parsed)
    })    

    // // Register on message
    // socket.onmessage = (event) => {
    //   const data = JSON.parse(event.data)

    //   if(data.type === "describeResponse") {

    //   }
    // };    
  }

  // onMessage(callback: (data: any) => void) {
  //   this.socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data)
  //     callback(data)
  //   }
  // }

  ping() {
    this.socket.send("ping");
  }

  describe() {
    const message = JSON.stringify({
      type: "describe",
    })

    this.socket.send(message);
  }

  run(reactFlow: any) {
    const message = JSON.stringify({
      type: "run",
      reactFlow: reactFlow,
    })

    this.socket.send(message);
  }
}