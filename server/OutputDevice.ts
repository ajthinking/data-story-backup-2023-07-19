import { LinkId } from "./Link"
import { Item } from "./Item"
import { PortId } from "./Port"

type LinkItems = Record<LinkId, Item[]>

export type OutputTree = Record<PortId, LinkItems>

export interface OutputDeviceInterface {
  push(items: any[]): void
  pushTo(name: string, items: any[]): void
}

export class OutputDevice implements OutputDeviceInterface {
  constructor(private outputTree: OutputTree = {}) {}

  push(items: any[]) {
    return this.pushTo('output', items)
  }

  pushTo(name: string, items: any[]) {
    const connectedLinks = this.outputTree[name]
    const outgoingItemLists = Object.values(connectedLinks)

    for(const itemList of outgoingItemLists) {
      itemList.push(...items)
    }
  }
}