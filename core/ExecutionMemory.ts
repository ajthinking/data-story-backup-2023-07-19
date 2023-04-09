import { NodeStatus } from "./Executor"
import { Item } from "./Item"
import { LinkId } from "./Link"
import { NodeId } from "./Node"

export class ExecutionMemory {
  history: string[] = []

  constructor(
    private nodeStatuses: Map<NodeId, NodeStatus>,
    private nodeRunners: Map<NodeId, AsyncGenerator<undefined, void, void>>,  
    private linkItems: Map<LinkId, Item[]>,
    private linkCounts: Map<LinkId, number>
  ) {}

  getNodeStatus(nodeId: NodeId): NodeStatus | undefined {
    return this.nodeStatuses.get(nodeId)
  }

  setNodeStatus(nodeId: NodeId, status: NodeStatus) {
    this.history.push(`Setting node ${nodeId} to ${status}`)

    this.nodeStatuses.set(nodeId, status)
  }

  getNodeStatuses(): Map<NodeId, NodeStatus> {
    return this.nodeStatuses
  }

  getNodeRunner(nodeId: NodeId): AsyncGenerator<undefined, void, void> | undefined {
    return this.nodeRunners.get(nodeId)
  }

  setNodeRunner(nodeId: NodeId, status: AsyncGenerator<undefined, void, void>) {
    this.history.push(`Setting node ${nodeId} runner`)

    this.nodeRunners.set(nodeId, status)
  }

  getLinkItems(linkId: LinkId): Item[] | undefined {
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

  getLinkCount(linkId: LinkId): number | undefined {
    return this.linkCounts.get(linkId)
  }

  getLinkCounts(): Map<LinkId, number> {
    return this.linkCounts
  }

  setLinkCount(linkId: LinkId, count: number) {
    this.history.push(`Setting link ${linkId} count to ${count}`)

    this.linkCounts.set(linkId, count)
  }

  getHistory(): string[] {
    return this.history
  }

  pushHistoryMessage(message: string) {
    this.history.push(message)
  }
}