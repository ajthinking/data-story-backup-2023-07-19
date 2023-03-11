import { Diagram } from "./Diagram";

export class Server {
  async runDiagram(diagram: Diagram) {

    console.log("YEAH Baby running the diagram!")

    // for await (const step of diagram.execute()) {
    //   console.log({ step });
    // }
  }
}