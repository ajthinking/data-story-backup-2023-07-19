import { shallow } from 'zustand/shallow';
import { NodeDescription } from '../../server/commands/describe';
import { useStore } from './store';

export class ServerClient {
  private socket: WebSocket;

  constructor(
    socket: WebSocket,
    setAvailableNodes: (nodes: NodeDescription[]) => void,
    updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
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
        updateEdgeCounts(parsed.counts)
        return;
      }

      if(parsed.type === "executionResult") {
        setTimeout(() => alert("Execution complete 💫"), 100)

        return
      }

      throw("Unknown message type: " + parsed.type)
    })    
  }

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