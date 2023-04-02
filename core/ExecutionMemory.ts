import { NodeStatus } from "./Executor"
import { Item } from "./Item"
import { LinkId } from "./Link"
import { NodeId } from "./Node"

export class ExecutionMemory {
  debugger: any[] = [] // TODO

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
    this.nodeStatuses.set(nodeId, status)
  }

  getNodeStatuses(): Map<NodeId, NodeStatus> {
    return this.nodeStatuses
  }

  getNodeRunner(nodeId: NodeId): AsyncGenerator<undefined, void, void> | undefined {
    return this.nodeRunners.get(nodeId)
  }

  setNodeRunner(nodeId: NodeId, status: AsyncGenerator<undefined, void, void>) {
    this.nodeRunners.set(nodeId, status)
  }

  getLinkItems(linkId: LinkId): Item[] | undefined {
    return this.linkItems.get(linkId)
  }

  setLinkItems(linkId: LinkId, items: Item[]) {
    this.linkItems.set(linkId, items)
  }

  getLinkCount(linkId: LinkId): number | undefined {
    return this.linkCounts.get(linkId)
  }

  getLinkCounts(): Map<LinkId, number> {
    return this.linkCounts
  }

  setLinkCount(linkId: LinkId, count: number) {
    this.linkCounts.set(linkId, count)
  }

}