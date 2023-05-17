import { Node, NodeId } from "./types/Node";
import { Diagram } from "./Diagram";
import { PortLinkMap } from "./types/PortLinkMap";
import { OutputDevice } from "./OutputDevice";
import { PortId } from "./types/Port";
import { Computer } from "./types/Computer";
import { ItemValue } from "./types/ItemValue";
import { LinkId } from "./types/Link";
import { ExecutionUpdate } from "./types/ExecutionUpdate";
import { isFinished } from "./utils/isFinished";
import { ParamsDevice } from "./types/ParamsDevice";
import { Storage } from "./types/Storage";
import { ExecutionMemory } from "./ExecutionMemory";
import { ExecutorInterface } from "./types/ExecutorInterface";
import { InputDevice } from "./InputDevice";
import { mapToRecord } from "./utils/mapToRecord";
import { Hook } from "./types/Hook";

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

    let pendingPromises: Promise<void>[] = []
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
              // TODO: The problem with this implementation:
              // If a node is done, but its output is not yet consumed,
              // then yes we can mark node as complete, but we will not be
              // able to complete decendant nodes depending on it.
              // Because they probably still have the just outputted items to process.
              // So, we have to wait until the "cleanup" loop.
              // This can be solved by having a "consumed" flag on the node ??
              // Or, upon a "rounds complete event" the input device can notify ??
              // Or something else...
              this.diagram.directDescendant(node).forEach(node => {
                this.attemptToMarkNodeComplete(node);
              })

              return;
            }

            // Not done, so node is available again!
            this.memory.setNodeStatus(node.id, 'AVAILABLE')
          })        
          .catch((error: Error) => {
            console.log("Registering an execution error")
            this.memory.pushHistoryMessage(error.message || 'Error in node')
            executionError = error;
          })
      })

      // Add this batch of promises to the pending list
      pendingPromises.push(...promises)

      // If no promises, then we might be stuck
      if(pendingPromises.length === 0) {
        this.memory.pushHistoryMessage('No pending promises.')

        console.log("No pending promises. Checking for completed nodes.")

        // Check for nodes we can mark as complete
        for(const node of this.diagram.nodes) {
          this.attemptToMarkNodeComplete(node);
        }
      }

      // await only the first state change since
      // it can open up for more nodes to proceed immediately
      if(pendingPromises.length > 0) {
        await Promise.race(pendingPromises);
        yield {
          type: 'ExecutionUpdate',
          counts: mapToRecord(this.memory.getLinkCounts()),
          hooks: this.memory.pullHooks(),
        }
      }
    }

    if(executionError) {
      console.log("Rethrowing the execution error in an awaitable timeline")
      throw(executionError)
    }

    yield {
      type: 'ExecutionUpdate',
      counts: mapToRecord(this.memory.getLinkCounts()),
      hooks: this.memory.pullHooks(),
    }
  }

  protected makeExecutionMemory() {
    // Maps
    const nodeStatuses = new Map<NodeId, NodeStatus>();
    const linkItems = new Map<LinkId, ItemValue[]>();
    const linkCounts = new Map<LinkId, number>();
    const nodeRunners = new Map<NodeId, AsyncGenerator<undefined, void, void>>();
    const inputDevices = new Map<PortId, InputDevice>();

    // The memory object
    const memory = new ExecutionMemory({
      nodeStatuses,
      nodeRunners,
      linkItems,
      linkCounts,
      inputDevices,
    })

    // Configure the memory's initial state
    for(const link of this.diagram.links) {
      // Set all links to be empty
      linkItems.set(link.id, [])
      linkCounts.set(link.id, 0)
    }
    
    for(const node of this.diagram.nodes) {
      // Set all nodes to available
      nodeStatuses.set(node.id, 'AVAILABLE')

      // Register input devices
      const inputDevice = this.makeInputDevice(node, memory)
      inputDevices.set(node.id, inputDevice)

      // // Initialize runner generators
      const computer = this.computers.get(node.type)!
      nodeRunners.set(
        node.id,
        computer.run({
          input: inputDevice,
          output: this.makeOutputDevice(node, memory),
          params: this.makeParamsDevice(computer, node),
          storage: this.storage,
          hooks: {
            register: (hook: Hook) => {
              this.memory.pushHooks([hook])
            }
          }
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

  protected async clearFinishedPromises(promises: Promise<void>[]) {
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
        isAvailable: () => this.memory.getNodeStatus(node.id) === 'AVAILABLE',
        input: this.memory.getInputDevice(node.id)!
      })

      // Decide with some heuristics
      return this.canRunNodeDefault(node)
    })
  }

  // TODO: this should be renamed to SHOULD_RUN_NODE_DEFAULT ?!
  protected canRunNodeDefault(node: Node) {
    // Get the nodes input device
    const input = this.memory.getInputDevice(node.id)!

    // Must be available
    if(this.memory.getNodeStatus(node.id) !== 'AVAILABLE') return false;

    // If one input port, it must not be empty
    if(node.inputs.length === 1 && !input.haveItemsAtInput(node.inputs.at(0)!.name))
      return false;

    // If two or more ports, all items must be awaited
    if(node.inputs.length >= 2 && !input.haveAllItemsAtAllInputs())
      return false;

    // All passed
    return true
  }

  protected makeInputDevice(node: Node, memory: ExecutionMemory) {
    return new InputDevice(
      node,
      this.diagram,
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

  /**
   * Marks nodes as complete if some default heuristics are met.
   */
  protected attemptToMarkNodeComplete(node: Node) {
    // Node must not be busy
    if(this.memory.getNodeStatus(node.id) === 'BUSY') return;
    
    // Node must have no awaiting items at links
    const input = this.memory.getInputDevice(node.id)!
    if(input.haveItemsAtAnyInput()) return;

    // Node must have no incomplete ancestors
    const ancestors = this.diagram.directAncestor(node)
    for(const ancestor of ancestors) {
      if(this.memory.getNodeStatus(ancestor.id) !== 'COMPLETE') return;
    }
    
    // Passed all checks, so mark as complete
    this.memory.setNodeStatus(node.id, 'COMPLETE')
  }
}