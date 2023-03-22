import { expect } from "vitest";
import { Computer, ComputerFactory } from "../Computer";
import { Diagram } from "../Diagram";
import { Executor } from "../Executor";
import { InputDevice } from "../InputDevice";
import { InputDeviceFactory } from "../InputDeviceFactory";
import { Item } from "../Item";
import { Link } from "../Link";
import { Node } from "../Node";
import { OutputDevice } from "../OutputDevice";
import { OutputDeviceFactory } from "../OutputDeviceFactory";
import { Param } from "../Param";
import { ParamsDevice } from "../ParamsDevice";
import { Port } from "../Port";
import { TestStep } from "./TestStep";

import { doRun, expectCanRun, expectCantRun, expectOutput, expectOutputs, getsInput, getsInputs } from "./testSteps";

export const when = (factory: ComputerFactory) => {
  return new ComputerTester(factory())
}

type TestStepArgs = any[]

export class ComputerTester {
  constructor(public computer: Computer) {}
  diagram: Diagram | null = null
  node: Node | null = null

  explicitParams: Record<string, any> = {}

  steps: [TestStep, TestStepArgs][] = []
  
  inputs: {
    [key: string]: Item[]
  } = {}
  
  expectedOutputs: {
    [key: string]: Item[]
  } = {}

  runner: AsyncGenerator | null = null

  inputDevice: InputDevice | null = null
  outputDevice: OutputDevice | null = null

  /**
   * After all steps have been registered, call this method to perform them 💫
   */
  async ok() {
    this.diagram = this.makeDiagram()
    this.node = this.diagram.nodes[0]
    
    this.inputDevice = this.makeInputDevice()
    this.outputDevice = this.makeOutputDevice()
    const params: ParamsDevice = this.makeParamsDevice()



    this.runner = this.computer.run({
      input: this.inputDevice,
      output: this.outputDevice,
      params,
    })

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

  hasParams(params: Record<string, any>) {
    this.explicitParams = params

    return this
  }

  getsInput(input: Item[]) {
    this.steps.push([getsInput, [input]])

    return this
  }

  getsInputs(inputs: Record<string, any>) {
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

  expectOutput(output: any) {
    this.steps.push([expectOutput, [output]])

    return this
  }

  expectOutputs(outputs: any) {
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
    return InputDeviceFactory.createWithItemsAtFirstLink(
      this.node!,
      this.diagram!,
      this.inputs
    )
  }

  protected makeOutputDevice() {
    return OutputDeviceFactory.create(
      this.node!,
      this.diagram!,      
    )
  }

  protected makeParamsDevice(): ParamsDevice {
    const device: Partial<ParamsDevice> = {}
    const params = this.computer.params || []

    for(const param of params) {
      const hasExplicitValue = this.explicitParams.hasOwnProperty(param.name)

      if(hasExplicitValue) {
        device[param.name] = this.explicitParams[param.name]
        continue
      }
      
      device[param.name] = param.value
    }

    device.__raw = this.computer.params || []

    return device as ParamsDevice;
  }
}

