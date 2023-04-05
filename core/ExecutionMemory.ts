import { NodeStatus } from "./Executor"
import { Item } from "./Item"
import { LinkId } from "./Link"
import { NodeId } from "./Node"
import { green, blue } from "../utils/coloredStrings"

export class ExecutionMemory {
  debugger: any[] = [] // TODO

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
    console.log(
      blue(`Setting node ${nodeId} to ${status}`)
    )

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
    console.log(
      blue(`Setting node ${nodeId} runner`)
    )

    this.nodeRunners.set(nodeId, status)
  }

  getLinkItems(linkId: LinkId): Item[] | undefined {
    // console.log(
    //   green(`Getting link ${linkId} items`)
    // )
    return this.linkItems.get(linkId)
  }

  setLinkItems(linkId: LinkId, items: Item[]) {
    console.log(
      blue(`Setting link ${linkId} items: ${JSON.stringify(items)}`)
    )

    this.linkItems.set(linkId, items)
  }

  getLinkCount(linkId: LinkId): number | undefined {
    // console.log(
    //   green(`Getting link ${linkId} count`)
    // )
    return this.linkCounts.get(linkId)
  }

  setLinkCount(linkId: LinkId, count: number) {
    console.log(
      blue(`Setting link ${linkId} count: ${count}`)
    )
    this.linkCounts.set(linkId, count)
  }  

  getLinkCounts(): Map<LinkId, number> {
    // console.log(
    //   green(`Getting link counts`)
    // )
    return this.linkCounts
  }
}