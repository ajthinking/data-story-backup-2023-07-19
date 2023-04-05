import { NodeStatus } from "./Executor"
import { Item } from "./Item"
import { LinkId } from "./Link"
import { NodeId } from "./Node"
import { green, blue } from "../utils/coloredStrings"

export class ExecutionMemory {
  history: string[] = []

  constructor(
    private nodeStatuses: Map<NodeId, NodeStatus>,
    private nodeRunners: Map<NodeId, AsyncGenerator<undefined, void, void>>,  
    private linkItems: Map<LinkId, Item[]>,
    private linkCounts: Map<LinkId, number>
  ) {}

  getNodeStatus(nodeId: NodeId): NodeStatus | undefined {
    // console.log(
    //   green(`Getting node ${nodeId} status`)
    // )
    return this.nodeStatuses.get(nodeId)
  }

  setNodeStatus(nodeId: NodeId, status: NodeStatus) {
    this.history.push(`Setting node ${nodeId} to ${status}`)

    this.nodeStatuses.set(nodeId, status)
  }

  getNodeStatuses(): Map<NodeId, NodeStatus> {
    // console.log(
    //   green(`Getting node statuses`)
    // )
    return this.nodeStatuses
  }

  getNodeRunner(nodeId: NodeId): AsyncGenerator<undefined, void, void> | undefined {
    // console.log(
    //   green(`Getting node ${nodeId} runner`)
    // )
    return this.nodeRunners.get(nodeId)
  }

  setNodeRunner(nodeId: NodeId, status: AsyncGenerator<undefined, void, void>) {
    this.history.push(`Setting node ${nodeId} runner`)

    this.nodeRunners.set(nodeId, status)
  }

  getLinkItems(linkId: LinkId): Item[] | undefined {
    // console.log(
    //   green(`Getting link ${linkId} items`)
    // )
    return this.linkItems.get(linkId)
  }

  pullLinkItems(linkId: LinkId, count: number = Infinity): Item[] {
    const linkItems = this.linkItems.get(linkId)!
    const pulled = linkItems.splice(0, count)

    this.history.push(`Pulled in ${pulled.length} items from link ${linkId}`)

    return pulled
  }

  pushLinkItems(linkId: LinkId, items: Item[]): void {
    const linkItems = this.linkItems.get(linkId)!
    linkItems.push(...items)

    this.history.push(`Pushed ${items.length} items to link ${linkId}`)
  }

  setLinkItems(linkId: LinkId, items: Item[]) {
    this.history.push(`Setting link ${linkId} items: ${JSON.stringify(items)}`)

    this.linkItems.set(linkId, items)
  }

  getLinkCounts(): Map<LinkId, number> {
    // console.log(
    //   green(`Getting link counts`)
    // )
    return this.linkCounts
  }

  getHistory(): string[] {
    return this.history
  }

  pushHistoryMessage(message: string) {
    this.history.push(message)
  }
}