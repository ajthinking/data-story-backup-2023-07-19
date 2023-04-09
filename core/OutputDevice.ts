import { LinkId } from "./Link"
import { Item } from "./Item"
import { PortId } from "./Port"
import { PortName } from "./Computer"
import { ExecutionMemory } from "./ExecutionMemory"

type LinkItems = Record<LinkId, Item[]>

export type OutputTree = Record<PortId, LinkItems>

export type PortLinkMap = Record<PortName, LinkId[]>

export interface OutputDeviceInterface {
  push(items: Item[]): void
  pushTo(name: string, items: Item[]): void
  itemsAt?(name: string): Item[]
}

export class OutputDevice implements OutputDeviceInterface {
  constructor(
    private portLinkMap: PortLinkMap = {},
    private memory: ExecutionMemory,
  ) {}

  push(items: Item[]) {
    return this.pushTo('output', items)
  }

  pushTo(name: PortName, items: Item[]) {
    const connectedLinks = this.portLinkMap[name]

    
    for(const linkId of connectedLinks) {
      // Update items on link
      this.memory.pushLinkItems(linkId, items)

      // Update link counts
      const count = this.memory.getLinkCount(linkId)!
      this.memory.setLinkCount(linkId, count + items.length)
    }
  }

  /**
   * 
   * (Test) Utility to get items have been outputted through a port
   */
  itemsOutputtedThrough(name: PortName): Item[] {
    const [connectedLink] = this.portLinkMap[name]

    return this.memory.getLinkItems(connectedLink) ?? []
  }
}