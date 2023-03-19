import { Node, NodeId } from "./Node";
import { Diagram } from "./Diagram";
import { InputDevice, InputTree } from "./InputDevice";
import { OutputDevice, OutputTree } from "./OutputDevice";
import { PortId } from "./Port";
import { Computer } from "./Computer";
import { Item } from "./Item";
import { LinkId } from "./Link";
import { ExecutionUpdate } from "./ExecutionUpdate";
import { ExecutionResult } from "./ExecutionResult";

export type NodeStatus = 'AVAILABLE' | 'BUSY' | 'COMPLETE';

export class Executor {
  // consider refactoring all of these...
  nodeStatuses = new Map<NodeId, NodeStatus>();
  nodeRunners = new Map<NodeId, AsyncGenerator<undefined, void, void>>();  
  linkItems = new Map<LinkId, Item[]>();
  linkCounts = new Map<LinkId, number>();
  // do we need to add a PromiseBank?
  // to keep track of promises that are in flight

  constructor(
    public diagram: Diagram,
    public computers: Map<string, Computer>,
  ) {}

  async *execute(): AsyncGenerator<ExecutionUpdate, ExecutionResult, void> {
    console.log("OOOOBOY! lets start!")
    this.initState()
    
    while(!this.isComplete()) {
      console.log("Its not complete! - LOOP STARTS")
      // Start execution of all nodes that can run
      const runnables = this.getRunnableNodes()
      console.log("Runnable count: ", runnables.length)

      const promises = runnables.map(node => {
        console.log("Running node ", node.id)
        // Put node in busy state
        this.nodeStatuses.set(node.id, 'BUSY')

        // Run
        const runner = this.nodeRunners.get(node.id)!;
        const promise = runner.next()

        // Handle run result
        promise.then((result: IteratorResult<undefined, void>) => {
          if(result.done) {
            console.log("A node is done!", node.id)
            this.nodeStatuses.set(node.id, 'COMPLETE');
            return;
          }

          // not done, so node is available again!
          console.log("not done, so node is available again!", node.id)
          this.nodeStatuses.set(node.id, 'AVAILABLE')
        })

        return promise
      })

      // If no promises, then we are stuck??? TODO ensure this works!
      if(promises.length === 0) {
        console.log(this.nodeRunners.get('Signal.1'))
      }

      if(promises.length === 0 && this.noBusyNodes()) {
        // Mark all nodes as complete
        for(const node of this.diagram.nodes) {
          this.nodeStatuses.set(node.id, 'COMPLETE')
        }
      }

      // await only the first state change since
      // it can open up for more nodes to proceed immediately
      if(promises.length > 0) {
        await Promise.race(promises);
        yield new ExecutionUpdate(this.linkCounts)
      }
    }

    return new ExecutionResult(this.linkCounts)
  }

  protected initState() {
    for(const link of this.diagram.links) {
      // Set all links to be empty
      this.linkItems.set(link.id, [])
      this.linkCounts.set(link.id, 0)
    }
    
    for(const node of this.diagram.nodes) {
      // Set all nodes to available
      this.nodeStatuses.set(node.id, 'AVAILABLE')

      // Initialize runner generators
      const computer = this.computers.get(node.type)!
      this.nodeRunners.set(
        node.id,
        computer.run({
          input: this.makeInputDevice(node),
          output: this.makeOutputDevice(node),
          // TODO: WHO OWNS THE PARAMS??
          // I think, while they originating from React Flow NODES configuration,
          // they should be considered as settings given to the computer.
          // The computer is initialized/hydrated with the params
          params: {},
        })
      )
    }
  }

  protected isComplete(): boolean {
    for(const status of this.nodeStatuses.values()) {
      if(status !== 'COMPLETE') return false;
    }

    return true
  }  

  protected async runBootHooks() {
    // For all nodes see if they have boot, if so run them
  }

  protected async runShutDownHooks() {
    // For all nodes see if they have shutdown, if so run them
  }

  protected getRunnableNodes(): any[] {
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
    if(this.nodeStatuses.get(node.id) !== 'AVAILABLE') return false;

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
      const items = this.linkItems.get(link.id)!
      return items.length > 0
    })
    
    return Boolean(linkWithItems)
  }

  protected inputHaveAllItems(id: PortId): boolean {
    const links = this.diagram.linksConnectedToPortId(id)
    const nodeIds = links.map(link => link.sourcePortId)
    
    return nodeIds.every(nodeId => this.nodeStatuses.get(nodeId) === 'COMPLETE')
  }
  
  protected inputsHaveAllItems(inputs: any[]) {
    return inputs.every(this.inputHaveAllItems)
  }

  protected noBusyNodes() {
    return Array.from(this.nodeStatuses.values()).every(status => status !== 'BUSY')
  }

  protected makeInputDevice(node: Node) {
    let tree: InputTree = {}

    for(const input of node.inputs) {
      tree[input.name] = {}

      for(const link of this.diagram.linksConnectedToPortId(input.id)) {
        tree[input.name][link.id] = this.linkItems.get(link.id)!
      }
    }

    return new InputDevice(tree)
  }

  protected makeOutputDevice(node: Node) {
    let tree: OutputTree = {}

    for(const output of node.outputs) {
      tree[output.name] = {}

      for(const link of this.diagram.linksConnectedToPortId(output.id)) {
        tree[output.name][link.id] = this.linkItems.get(link.id)!
      }
    }

    return new OutputDevice(tree, this.linkCounts)
  }
}