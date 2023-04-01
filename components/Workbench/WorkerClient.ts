import { NodeDescription } from '../../server/commands/describe';
import { ServerClient } from './ServerClient';

export class WorkerClient implements ServerClient {
  private worker: Worker;

  constructor(
    private setAvailableNodes: (nodes: NodeDescription[]) => void,
    private updateEdgeCounts: (edgeCounts: Record<string, number>) => void,
  ) {
    this.worker = new Worker("./worker.js");
  }

  init() {
    console.log("Hey, I'm the worker client! Im cool!")
    this.worker.addEventListener("message", (event) => {
      const parsed = JSON.parse(event.data);

      if (parsed.type === "describeResponse") {
        console.log("Got describe response: ", parsed)
        this.setAvailableNodes(parsed.availableNodes);
        return;
      }

      if (parsed.type === "executionUpdate") {
        this.updateEdgeCounts(parsed.counts);
        return;
      }

      if (parsed.type === "executionResult") {
        setTimeout(() => alert("Execution complete 💫"), 100);
        return;
      }

      throw new Error("Unknown message type: " + parsed.type);
    });

    this.worker.addEventListener("error", (error) => {
      console.error("Worker error: ", error);
    });

    // Ask the worker to describe capabilities
    this.describe();
  }

  describe() {
    const message = JSON.stringify({
      type: "describe",
    });

    this.worker.postMessage(message);
  }

  run(reactFlow: any) {
    const message = JSON.stringify({
      type: "run",
      reactFlow: reactFlow,
    });

    this.worker.postMessage(message);
  }
}