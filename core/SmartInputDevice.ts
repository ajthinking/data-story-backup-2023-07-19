import { LinkId } from "./Link"
import { ItemValue } from "./ItemValue"
import { PortId } from "./Port"
import { ExecutionMemory } from "./ExecutionMemory"
import { PortName } from "./Computer"
import { ItemWithParams } from "./ItemWithParams"
import { Param, ParamValue } from "./Param"
import { Diagram } from "./Diagram"
import { Node } from "./Node"

export type PortLinkMap = Record<PortName, LinkId[]>

export interface InputDeviceInterface {
  pull: (count?: number) => ItemWithParams[]
  pullFrom: (name: string, count?: number) => ItemWithParams[]
  haveItemsAtInput(name: string): boolean;
  haveAllItemsAtInput(name: string): boolean;
  itemCountAtInput(name: string): number;
}

export class SmartInputDevice implements InputDeviceInterface {
  constructor(
    // The node that is using this input device
    private node: Node,
    // The node topology
    private diagram: Diagram,
    // The current execution state
    private memory: ExecutionMemory,
    // The params passed in the node
    private params: Record<string, ParamValue>
  ) {}

  /**
   * Shorthand to pull items at 'input'
   */
  pull(count?: number) {
    return this.pullFrom('input', count)
  }

  /**
   * Removes and return items at edges connected to input with name 
   */
  pullFrom(name: string, count: number = Infinity): ItemWithParams[] {
    let remaining = count
    const pulled: ItemValue[] = []
    const links = this.linksAtPort(name)

    for(const linkId of links) {
      const batch = this.memory.pullLinkItems(linkId, remaining)
      pulled.push(...batch)
      remaining -= batch.length
      if(remaining === 0) break
    }

    // enhance ItemValue to ItemWithParams
    return pulled.map(item => new ItemWithParams(item, this.params))
  }

  /**
   * Shorthand to set items while testing
   */
  setItemsAt(linkId: LinkId, items: ItemValue[]) {
    this.memory.setLinkItems(linkId, items)
  }

  haveItemsAtInput(name: string): boolean {
    const port = this.node.inputs.find(input => input.name === name)!
    const links = this.diagram.linksConnectedToPortId(port.id)

    for(const link of links) {
      if(this.memory.getLinkItems(link.id)!.length > 0) return true
    }

    return false
  }

  haveAllItemsAtInput(name: string): boolean {
    const port = this.node.inputs.find(input => input.name === name)!
    const links = this.diagram.linksConnectedToPortId(port.id)

    for(const link of links) {
      const sourcePort = link.sourcePortId
      const sourceNode = this.diagram.nodeWithOutputPortId(sourcePort)!
      const sourceStatus = this.memory.getNodeStatus(sourceNode.id)

      console.log('sourceStatus', sourceStatus)
      if(sourceStatus !== 'COMPLETE') return false
    }

    return true
  }

  itemCountAtInput(name: string): number {
    const port = this.node.inputs.find(input => input.name === name)!
    const links = this.diagram.linksConnectedToPortId(port.id)

    let count = 0
    for(const link of links) {
      count += this.memory.getLinkItems(link.id)!.length
    }

    return count
  }

  protected linksAtPort(name: string): LinkId[] {
    const port = this.node.inputs.find(input => input.name === name)!
    const links = this.diagram.linksConnectedToPortId(port.id)

    return links.map(link => link.id)
  }
}