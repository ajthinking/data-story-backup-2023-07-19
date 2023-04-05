import { LinkId } from "./Link"
import { Item } from "./Item"
import { PortId } from "./Port"
import { PortName } from "./Computer"
import { ExecutionMemory } from "./ExecutionMemory"

type LinkItems = Record<LinkId, Item[]>

export type OutputTree = Record<PortId, LinkItems>

export interface OutputDeviceInterface {
  push(items: Item[]): void
  pushTo(name: string, items: Item[]): void
  itemsAt?(name: string): Item[]
}

export class OutputDevice implements OutputDeviceInterface {
  constructor(
    private outputTree: OutputTree = {},
    private linkCounts: Map<LinkId, number>,
    private memory: ExecutionMemory,
  ) {}

  push(items: Item[]) {
    return this.pushTo('output', items)
  }

  pushTo(name: PortName, items: Item[]) {
    /*
      Example structure:
      {
        'Source.1.output--->Target.1.input': [1, 2, 3]
        'Source.2.output--->Target.1.input': [2, 3]
      }
    */    
    const connectedLinks = this.outputTree[name]

    /*
      Example structure:
      [
        'Source.1.output--->Target.1.input'
        'Source.2.output--->Target.1.input'
      ]
    */
    const linkIds = Object.keys(connectedLinks)

    // Update items on link
    for(const linkId of linkIds) {
      this.memory.pushLinkItems(linkId, items)
    }

    // Update link counts
    for(const linkId of Object.keys(connectedLinks)) {
      const count = this.linkCounts.get(linkId)!
      this.linkCounts.set(linkId, count + items.length)
    }
  }

  /**
   * 
   * (Test) Utility to get items have been outputted through a port
   */
  itemsOutputtedThrough(name: PortName): Item[] {
    const connectedLinks = this.outputTree[name]
    const [firstLinkItems] = Object.values(connectedLinks)

    return firstLinkItems
  }
}