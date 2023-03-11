import { Node } from "./computers/Node";
import { Diagram } from "./Diagram";
import { InputDevice } from "./InputDevice";
import { OutputDevice } from "./OutputDevice";

export type NodeStatus = 'AVAILABLE' | 'BUSY' | 'COMPLETE';

export class Execution {
  nodeStatuses = new Map<string, NodeStatus>
  nodeRunners = new Map<string, any>
  
  edgeItems = new Map<string, any[]>
  edgeCounts = new Map<string, number>
  

  constructor(
    public diagram: Diagram,
    public computers: Map<string, any>,
  ) {}

  async *execute() {
    this.initState()
    await this.runBootHooks()

    while(!this.isComplete()) {
      // Start execution of all nodes that can run
      const promises = this.getRunnableNodes().map(node => {
        this.nodeStatuses.set(node.id, 'BUSY')
        // Prepare to run
        const runner = this.nodeRunners.get(node.id);
        const inputDevice = new InputDevice
        const outputDevice = new OutputDevice

        // Run
        const promise = runner.run()

        // Handle run result
        promise.then((result: any) => {
          // Should we yield the outputs in result?
          // Or, should we let the Input/Outputdevices handle that?
          // When should items be pulled from the edge?
          // Who should will do it?
          if(result.done) {
            this.nodeStatuses.set(node.id, 'COMPLETE')
          }

          this.nodeStatuses.set(node.id, 'AVAILABLE')
        })

        return promise
      })

      // await only the first state change since that can open up for more nodes to run
      await Promise.race(promises)
    }

    await this.runShutDownHooks()

    return;
  }  

  protected initState() {
    for(const node of this.diagram.nodes) {
      // Set all nodes to available
      this.nodeStatuses.set(node.id, 'AVAILABLE')

      // Initialize runner generators
      this.nodeRunners.set(
        node.id,
        this.computers.get(node.type)()
      )
    }

    // Set all edges to be empty
    for(const edge of this.diagram.edges) {
      this.edgeItems.set(edge.id, [])
      this.edgeCounts.set(edge.id, 0)
    }
  }

  protected isComplete(): boolean {
    for(const status of Object.values(this.nodeStatuses)) {
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
      const computer = this.computers.get(node.type)
      const hook = computer.canRun
      if(hook) return hook({
        node,
        diagram: this.diagram,
        nodeStatuses: this.nodeStatuses,
        // add input/output devices here?
      })

      // Decide with some heuristics
      return this.canRunNodeDefault(node)
    })
  }

  protected canRunNodeDefault(node: Node) {
    // Must be available
    if(this.nodeStatuses.get(node.id) !== 'AVAILABLE') return false;

    // If one input port, it must not be empty
    if(node.inputs.length === 1 && !this.inputHaveItems(node.inputs[0])) return false;

    // If two or more ports, all items must be awaited
    if(node.inputs.length >= 2 && !this.inputsHaveAllItems(node.inputs)) return false;

    // All passed
    return true
  }

  protected inputHaveItems(id: string): boolean {
    const edges = this.edgesConnectedToInput(id)
    const edgeWithItems = edges.find(edge => {
      this.edgeItems.get(edge.id)
    })
    
    return Boolean(edgeWithItems)
  }

  protected inputHaveAllItems(id: string): boolean {
    const edges = this.edgesConnectedToInput(id)
    const nodes = edges.map(edge => edge.source)
    
    return nodes.every(node => this.nodeStatuses.get(node.id) === 'COMPLETE')
  }

  protected edgesConnectedToInput(inputId: string): any[] {
    return this.diagram.edges.filter(edge => {
      return edge.target.id === inputId
    })
  }
  
  protected inputsHaveAllItems(inputs: any[]) {
    return inputs.every(this.inputHaveAllItems)
  }

  protected makeInputDevice(node: any) {
    const edges = node.inputs

    return {
      inputs: {
        input: {
          edges: {
            af: [],
            gh: [],
          }
        }
      }
    }
  }
}