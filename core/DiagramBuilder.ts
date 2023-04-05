import { Computer, ComputerFactory } from "./Computer";
import { Diagram } from "./Diagram";
import { Link } from "./Link";
import { Node } from "./Node";
import { Port } from "./Port";

export class DiagramBuilder {
  diagram: Diagram
  previousNode: Node | null = null

  constructor() {
    this.diagram = new Diagram([], [])
  }

  add(addable: ComputerFactory | Computer) {
    const computer = typeof addable === 'function' ? addable() : addable

    const nodeId = `${computer.name}.${this.getScopedId(computer.name)}`

    const node = new Node({
      id: nodeId,
      type: computer.name,
      inputs: (computer.inputs ?? []).map(name => {
        return new Port(`${nodeId}.${name}`, name)
      }),
      outputs: (computer.outputs ?? []).map(name => {
        return new Port(`${nodeId}.${name}`, name)
      }),
      params: (computer.params)
    })

    this.diagram.nodes.push(node)
    
    if (this.previousNode) this.linkToPrevious(node)

    this.previousNode = node

    return this
  }

  get() {
    return this.diagram
  }

  protected getScopedId(computerName: string) {
    const max = this.diagram.nodes
      .filter(node => node.type === computerName)
      .map(node => node.id)
      .map(id => id.split('.')[1])
      .map(id => parseInt(id))
      .reduce((max, id) => Math.max(max, id), 0)

    return max + 1      
  }

  protected linkToPrevious(newNode: Node) {
    const previousNode = this.previousNode!

    const previousNodePort: Port | undefined = previousNode.outputs[0]
    const newNodePort: Port | undefined = newNode.inputs[0]

    if(!previousNodePort || !newNodePort) return

    const link = new Link(
      `${previousNodePort.id}-->${newNodePort.id}`,
      previousNodePort.id,
      newNodePort.id,
    )

    this.diagram.links.push(link)
  }
}