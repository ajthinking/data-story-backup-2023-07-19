import { NodeDescription } from '../../server/commands/describe';
import { ServerClient } from './ServerClient';

export class SocketClient implements ServerClient {
  private socket: WebSocket;

  constructor(
    private setAvailableNodes: (nodes: NodeDescription[]) => void,
    private updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
  ) {
    this.socket = new WebSocket("ws://localhost:3100")   
  }

  init() {
    // Register on open
    this.socket.onopen = () => {
      console.log("Connected to server!");

      // Ask the server to describe capabilites
      this.describe()
    };

    // Register on close
    this.socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    this.socket.onmessage = ((data) => {
      const parsed = JSON.parse(data.data)

      if (parsed.type === "describeResponse") {
        this.setAvailableNodes(parsed.availableNodes)
        return;
      }

      if (parsed.type === "executionUpdate") {
        this.updateEdgeCounts(parsed.counts)
        return;
      }

      if(parsed.type === "executionResult") {
        setTimeout(() => alert("Execution complete 💫"), 100)

        return
      }

      throw("Unknown message type: " + parsed.type)
    }) 
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