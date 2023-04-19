import { NodeDescription } from '../../server/NodeDescription';
import { SerializedReactFlow } from './SerializedReactFlow';
import { ServerClient } from './ServerClient';

export class SocketClient implements ServerClient {
  private socket: WebSocket;

  constructor(
    private setAvailableNodes: (nodes: NodeDescription[]) => void,
    private updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
    private setNodes: (nodes: any) => void,
    private setEdges: (edges: any) => void,
    // private setViewport: (viewport: any) => void,
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

      if (parsed.type === "DescribeResponse") {
        this.setAvailableNodes(parsed.availableNodes)
        return;
      }

      if (parsed.type === "ExecutionUpdate") {
        this.updateEdgeCounts(parsed.counts)
        return;
      }

      if(parsed.type === "ExecutionResult") {
        setTimeout(() => alert("Execution complete 💫"), 100)

        return
      }

      if(parsed.type === "ExecutionFailure") {
        console.log("Execution failed: ", {
          history: parsed.history,
        })
        setTimeout(() => alert(parsed.message), 100)

        return
      }   
      
      if(parsed.type === "OpenResponse") {
        console.log("Open response: ", parsed)

        const flow = parsed.flow;

        // const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        this.setNodes(flow.nodes || []);
        this.setEdges(flow.edges || []);

        return;
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

  run(reactFlow: SerializedReactFlow) {
    const message = JSON.stringify({
      type: "run",
      reactFlow,
    })

    this.socket.send(message);
  }

  async open(name: string) {
    const message = JSON.stringify({
      type: "open",
      name,
    })

    this.socket.send(message);
  }

  async save(name: string, reactFlow: SerializedReactFlow) {
    const message = JSON.stringify({
      type: "save",
      name,
      reactFlow  
    })

    this.socket.send(message);
  }
}