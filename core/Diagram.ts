import { Link } from "./Link"
import { Node } from "./Node"
import { PortId } from "./Port"

export class Diagram {
  constructor(
    public nodes: Node[],
    public links: Link[],
  ) {}

  linksConnectedToPortId(id: PortId): Link[] {
    return this.links.filter(link => link.sourcePortId === id || link.targetPortId === id)
  }

  nodeWithOutputPortId(portId: PortId): Node | undefined {
    return this.nodes.find(node => {
      return node.outputs.find(output => output.id === portId)
    })
  }
}