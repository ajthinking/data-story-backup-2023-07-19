import { Computer } from "./Computer";
import { Diagram } from "./Diagram";
import { Node } from "./Node";

export class DiagramBuilder {
  diagram: Diagram
  previousNode: Node | null = null

  constructor() {
    this.diagram = new Diagram([], [])
  }

  add(computer: Computer) {
    const node = new Node({
      id: `${computer.name}.1`,
      type: computer.name,
      inputs: [],
      outputs: [],
    })

    this.diagram.nodes.push(node)

    if (this.previousNode) this.attemptLink(this.previousNode, node)

    return this
  }

  get() {
    return this.diagram
  }

  protected attemptLink(previous: Node, next: Node) {

  }
}