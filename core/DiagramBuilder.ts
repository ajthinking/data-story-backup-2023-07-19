import { Computer, ComputerConfigFactory } from "./types/Computer";
import { ComputerFactory } from "./ComputerFactory";
import { Diagram } from "./Diagram";
import { Node } from "./types/Node";
import { Port } from "./types/Port";
import { Link } from "./types/Link";

export class DiagramBuilder {
  diagram: Diagram
  previousNode: Node | null = null

  constructor() {
    this.diagram = new Diagram([], [])
  }

  add(addable: ComputerConfigFactory | Computer) {
    const config = typeof addable === 'function' ? addable() : addable
    const computer = ComputerFactory.fromComputerConfig(config)

    const nodeId = `${computer.name}.${this.getScopedId(computer.name)}`

    const node: Node = {
      id: nodeId,
      type: computer.name,
      inputs: (computer.inputs ?? []).map(input => {
        return { id: `${nodeId}.${input.name}`, name: input.name }
      }),
      outputs: (computer.outputs ?? []).map(output => {
        return { id: `${nodeId}.${output.name}`, name: output.name }
      }),
      params: (computer.params)
    }

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

    const previousNodePort: Port | undefined = previousNode.outputs.at(0)
    const newNodePort: Port | undefined = newNode.inputs.at(0)

    if(!previousNodePort || !newNodePort) return

    const link: Link = {
      id: `${previousNodePort.id}--->${newNodePort.id}`,
      sourcePortId: previousNodePort.id,
      targetPortId: newNodePort.id,
    }

    this.diagram.links.push(link)
  }
}