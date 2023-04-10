import { Node, NodeId } from "./Node";
import { Diagram } from "./Diagram";
import { InputDevice, PortLinkMap } from "./InputDevice";
import { OutputDevice, OutputTree } from "./OutputDevice";
import { Port, PortId } from "./Port";
import { Computer } from "./Computer";
import { ItemValue } from "./ItemValue";
import { LinkId } from "./Link";
import { ExecutionUpdate } from "./ExecutionUpdate";
import { isFinished } from "./utils/isFinished";
import { ParamsDevice } from "./ParamsDevice";
import { Storage } from "./Storage";
import { ExecutionMemory } from "./ExecutionMemory";
import { ExecutorInterface } from "./ExecutorInterface";

export type NodeStatus = 'AVAILABLE' | 'BUSY' | 'COMPLETE';

export class Executor implements ExecutorInterface {
  memory: ExecutionMemory;

  constructor(
    public diagram: Diagram,
    public computers: Map<string, Computer>,
    public storage: Storage
  ) {
    this.memory = this.makeExecutionMemory();
  }

  async *execute(): AsyncGenerator<ExecutionUpdate, void, void> {
    this.memory.pushHistoryMessage('Starting execution 🚀')

    let pendingPromises: Promise<any>[] = []
    let executionError: Error | undefined     
    
    while(!this.isComplete() && !executionError) {
      // cleanup old promises that are done
      pendingPromises = await this.clearFinishedPromises(pendingPromises)

      // Start execution of all nodes that can run
      const runnables = this.getRunnableNodes()

      const promises = runnables.map(node => {
        // Put node in busy state
        this.memory.setNodeStatus(node.id, 'BUSY')

        // Run
        const runner = this.memory.getNodeRunner(node.id)!; 
        return runner.next()
          .then((result: IteratorResult<undefined, void>) => {
            if(result.done) {
              this.memory.setNodeStatus(node.id, 'COMPLETE');
              return;
            }

            // Not done, so node is available again!
            this.memory.setNodeStatus(node.id, 'AVAILABLE')
          })        
          .catch((error: Error) => {
            console.log("Registering an execution error")
            executionError = error;
          })
      })

      // Add this batch of promises to the pending list
      pendingPromises.push(...promises)

      // If no promises, then we are stuck
      if(pendingPromises.length === 0) {
        this.memory.pushHistoryMessage('No pending promises, so we are stuck?! 🤷‍♂️')

        // Mark all nodes as complete
        for(const node of this.diagram.nodes) {
          this.memory.setNodeStatus(node.id, 'COMPLETE')
        }
      }

      // await only the first state change since
      // it can open up for more nodes to proceed immediately
      if(pendingPromises.length > 0) {
        await Promise.race(pendingPromises);
        yield new ExecutionUpdate(this.memory.getLinkCounts())
      }
    }

    if(executionError) {
      console.log("Rethrowing the execution error in an awaitable timeline")
      throw(executionError)
    }

    yield new ExecutionUpdate(this.memory.getLinkCounts())
  }

  protected makeExecutionMemory() {
    // Maps
    const nodeStatuses = new Map<NodeId, NodeStatus>();
    const linkItems = new Map<LinkId, ItemValue[]>();
    const linkCounts = new Map<LinkId, number>();
    const nodeRunners = new Map<NodeId, AsyncGenerator<undefined, void, void>>();

    // The memory object
    const memory = new ExecutionMemory(
      nodeStatuses,
      nodeRunners,
      linkItems,
      linkCounts
    )

    // Configure memory initial state
    for(const link of this.diagram.links) {
      // Set all links to be empty
      linkItems.set(link.id, [])
      linkCounts.set(link.id, 0)
    }
    
    for(const node of this.diagram.nodes) {
      // Set all nodes to available
      nodeStatuses.set(node.id, 'AVAILABLE')

      // // Initialize runner generators
      const computer = this.computers.get(node.type)!
      nodeRunners.set(
        node.id,
        computer.run({
          input: this.makeInputDevice(node, memory),
          output: this.makeOutputDevice(node, memory),
          params: this.makeParamsDevice(computer, node),
          storage: this.storage
        })
      )
    }

    return memory
  }

  protected isComplete(): boolean {
    for(const status of this.memory.getNodeStatuses().values()) {
      if(status !== 'COMPLETE') return false;
    }

    return true
  }

  protected async clearFinishedPromises(promises: Promise<any>[]) {
    const passed = []

    for(const promise of promises) {
      if(await isFinished(promise)) continue;
      passed.push(promise)
    }

    return passed
  }

  protected getRunnableNodes(): Node[] {
    return this.diagram.nodes.filter(node => {
      // If the computer implements a custom hook
      const computer = this.computers.get(node.type)!
      const hook = computer.canRun
      if(hook) return hook({
        // TODO: fix later!
        // node,
        // diagram: this.diagram,
        // nodeStatuses: this.nodeStatuses,
        // add input/output devices here?
      })

      // Decide with some heuristics
      return this.canRunNodeDefault(node)
    })
  }

  // TODO: this should be renamed to SHOULD_RUN_NODE_DEFAULT ?!
  protected canRunNodeDefault(node: Node) {
    // Must be available
    if(this.memory.getNodeStatus(node.id) !== 'AVAILABLE') return false;

    // If one input port, it must not be empty
    if(node.inputs.length === 1 && !this.inputHaveItems(node.inputs[0].id)) return false;

    // If two or more ports, all items must be awaited
    if(node.inputs.length >= 2 && !this.inputsHaveAllItems(node.inputs)) return false;

    // All passed
    return true
  }

  protected inputHaveItems(id: PortId): boolean {
    const links = this.diagram.linksConnectedToPortId(id)
    const linkWithItems = links.find(link => {
      const items = this.memory.getLinkItems(link.id)!
      return items.length > 0
    })
    
    return Boolean(linkWithItems)
  }

  protected inputHaveAllItems(port: Port): boolean {
    const links = this.diagram.linksConnectedToPortId(port.id)
    const nodeIds = links.map(link => link.sourcePortId)
    
    return nodeIds.every(nodeId => this.memory.getNodeStatus(nodeId) === 'COMPLETE')
  }
  
  protected inputsHaveAllItems(inputs: Port[]) {
    return inputs.every(this.inputHaveAllItems)
  }

  protected noBusyNodes() {
    return Array.from(this.memory.getNodeStatuses().values()).every(status => status !== 'BUSY')
  }

  protected makeInputDevice(node: Node, memory: ExecutionMemory) {
    let map: PortLinkMap = {}

    for(const input of node.inputs) {
      const connectedLinks = this.diagram.linksConnectedToPortId(input.id)
      map[input.name] = connectedLinks.map(link => link.id);
    }

    return new InputDevice(
      map,
      memory,
      this.makeParamsDevice(this.computers.get(node.type)!, node)
    )
  }

  protected makeOutputDevice(node: Node, memory: ExecutionMemory) {
    let map: PortLinkMap = {}

    for(const output of node.outputs) {
      const connectedLinks = this.diagram.linksConnectedToPortId(output.id)
      map[output.name] = connectedLinks.map(link => link.id);
    }

    return new OutputDevice(map, memory)
  }

  protected makeParamsDevice(computer: Computer, node: Node): ParamsDevice {
    const device: Partial<ParamsDevice> = {}

    for(const param of Object.values(node.params)) {
      device[param.name] = param.value
    }

    return device as ParamsDevice;
  }
}