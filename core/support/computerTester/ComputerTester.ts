import { Computer, ComputerFactory } from "../../Computer";
import { Diagram } from "../../Diagram";
import { NodeStatus } from "../../Executor";
import { PortLinkMap } from "../../OldInputDevice";
import { ItemValue } from "../../ItemValue";
import { Link, LinkId } from "../../Link";
import { Node, NodeId } from "../../Node";
import { OutputDevice } from "../../OutputDevice";
import { ParamsDevice } from "../../ParamsDevice";
import { Port } from "../../Port";
import { TestStep } from "./TestStep";

import {
  doRun,
  expectCanRun,
  expectCantRun,
  expectError,
  expectOutput,
  expectOutputs,
  getsInput,
  getsInputs,
} from "./testSteps";

import { expectDone } from "./testSteps/expectDone";
import { ExecutionMemory } from "../../ExecutionMemory";
import { NullStorage } from "../../NullStorage";
import { InputDeviceInterface } from "../../InputDeviceInterface";
import { SmartInputDevice } from "../../SmartInputDevice";

export const when = (factory: ComputerFactory) => {
  return new ComputerTester(factory())
}

export type ExpectedOutputItems = {
  [key: string]: ItemValue[]
}

export type InputValues = {
  [key: string]: ItemValue[]
}

export type ExplicitParamValues = {
  [key: string]: any
}

type TestStepArgs = any[]

export class ComputerTester {
  diagram: Diagram | null = null
  node: Node | null = null
  explicitParams: ExplicitParamValues = {}
  steps: [TestStep, TestStepArgs][] = []
  inputs: {
    [key: string]: ItemValue[]
  } = {}
  expectedOutputs: {
    [key: string]: ItemValue[]
  } = {}
  runner: AsyncGenerator | null = null
  inputDevice: InputDeviceInterface | null = null
  outputDevice: OutputDevice | null = null
  memory: ExecutionMemory | null = null
  expectedErrorMessage: string | undefined

  constructor(public computer: Computer) {}  

  /**
   * After all steps have been registered, call this method to perform them 💫
   */
  async ok() {
    this.diagram = this.makeDiagram()
    this.node = this.diagram.nodes[0]
    this.memory = this.makeExecutionMemory()

    this.inputDevice = this.makeInputDevice()
    this.outputDevice = this.makeOutputDevice()

    // Initialize runner
    this.memory.setNodeRunner(
        this.node.id,
        this.computer.run({
          input: this.inputDevice,
          output: this.outputDevice,
          params: this.makeParamsDevice(),
          storage: new NullStorage(),
        })
    )

    // Runner handle
    this.runner = this.memory.getNodeRunner(this.node.id)!

    // Perform the preparation and assertion steps
    for(const [step, args] of this.steps) {
      await step.handle(this, ...args)
    }
  }
  
  doRun() {
    this.steps.push([doRun, []])

    return this
  }

  hasDefaultParams() {
    return this; // this is already true
  }

  hasParams(params: ExplicitParamValues) {
    this.explicitParams = params

    return this
  }

  // TODO getsFinalInput
  // TODO getsFinalInputs

  getsInput(input: ItemValue[]) {
    this.steps.push([getsInput, [input]])

    return this
  }

  getsInputs(inputs: InputValues) {
    this.steps.push([getsInputs, [inputs]])

    return this
  }

  expectCanRun() {
    this.steps.push([expectCanRun, []])

    return this
  }

  expectCantRun() {
    this.steps.push([expectCantRun, []])

    return this
  }

  expectDone() {
    this.steps.push([expectDone, []])

    return this
  }

  expectError(message: string) {
    this.steps.push([expectError, [message]])

    return this
  }

  expectOutput(output: ItemValue[]) {
    this.steps.push([expectOutput, [output]])

    return this
  }

  expectOutputs(outputs: ExpectedOutputItems) {
    this.steps.push([expectOutputs, [outputs]])

    return this
  }

  protected makeDiagram(): Diagram {
    const nodeId = `${this.computer.name}.1`
    // Create a new Node from the computer + params (TODO: this is a general need)    
    const node = new Node({
      id: nodeId,
      type: this.computer.name,
      inputs: (this.computer.inputs || []).map(input => new Port(
        `${nodeId}.${input}`,
        input
      )),
      outputs: (this.computer.outputs || []).map(output => new Port(
        `${nodeId}.${output}`,
        output
      )),
    })

    // Create dangling links to the inputs
    const inputLinks = node.inputs.map(inputPort => new Link(
      `dangling-link-to-port-${inputPort.id}`,
      `dangling-source-port-id`,
      `${nodeId}.${inputPort.name}`,
    ))

    // Create dangling links to the outputs
    const outputLinks = node.outputs.map(outputPort => new Link(
      `dangling-link-from-port-${outputPort.id}`,
      `${nodeId}.${outputPort.name}`,
      `dangling-target-port-id`,
    ))
    
    return new Diagram([node], [
      ...inputLinks,
      ...outputLinks,
    ])
  }

  protected makeInputDevice() {
    return new SmartInputDevice(
      this.node!,
      this.diagram!,
      this.memory!,
      this.makeParamsDevice(),
    )
  }

  protected makeOutputDevice() {
    let map: PortLinkMap = {}

    for(const output of this.node!.outputs) {
      const connectedLinkIds = this.diagram!
        .linksConnectedToPortId(output.id)
        .map(link => link.id)

      map[output.name] = connectedLinkIds
    }

    return new OutputDevice(map, this.memory!)
  }

  protected makeParamsDevice(): ParamsDevice {
    const device: Partial<ParamsDevice> = {}
    const params = this.computer.params || {}

    for(const param of Object.values(params)) {
      const hasExplicitValue = this.explicitParams.hasOwnProperty(param.name)

      if(hasExplicitValue) {
        device[param.name] = this.explicitParams[param.name]
        continue
      }

      device[param.name] = param.value
    }

    return device as ParamsDevice;
  }

  protected makeExecutionMemory() {
    // Maps
    const nodeStatuses = new Map<NodeId, NodeStatus>();
    const linkItems = new Map<LinkId, ItemValue[]>();
    const linkCounts = new Map<LinkId, number>();
    const nodeRunners = new Map<NodeId, AsyncGenerator<undefined, void, void>>();

    // The memory object
    const memory = new ExecutionMemory({
      nodeStatuses,
      nodeRunners,
      linkItems,
      linkCounts,
      // TODO inputDevice
    })

    // Configure memory initial state
    for(const link of this.diagram!.links) {
      // Set all links to be empty
      linkItems.set(link.id, [])
      linkCounts.set(link.id, 0)
    }
    
    for(const node of this.diagram!.nodes) {
      // Set all nodes to available
      nodeStatuses.set(node.id, 'AVAILABLE')
    }

    return memory
  }  
}
