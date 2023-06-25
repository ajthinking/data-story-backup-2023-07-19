import { Computer, ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { DiagramFactory } from '../../DiagramFactory';
import { string } from '../../ParamBuilder';
import { promises as fs } from 'fs'
import { ComputerConfig } from '../../types/ComputerConfig';
import { ComputerRegistry } from '../../../server/computerRegistry';
import { Executor } from '../../Executor';
import { DiagramBuilder } from '../../DiagramBuilder';
import { CreateJson } from '../CreateJson';
import { Signal } from '../Signal';
import { Ignore } from '../Ignore';
import { Log } from '../Log';
import { Input } from '../Input';
import { Output } from '../Output';
import { CreateAttribute } from '../CreateAttribute';
import { InputDevice } from '../../InputDevice';

export const RunDiagram: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'RunDiagram',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    path: string('path').get(),
  },
  
  async *run({ input, output, executorFactory }) {
    console.log("SETTING UP RUN DIAGRAM **************!")

    // First time, we need to load the diagram from disk
    // (PRETEND THIS IS FROM THE PARAMS)
    const diagram = new DiagramBuilder()
      .add(Input)
      .add(CreateAttribute, {
        key: 'stamp',
        value: '2021-01-01',
      })
      .add(Log)
      .get()
    
    // Setup the execution
    const executor = executorFactory!(diagram)

    // Bind "this" input device to the sub diagram input device
    // For now, assume only one input, named 'input'
    // Furthermore, assume no custom canRun rules
    const inputNode = diagram.nodes.find(node => node.type === 'Input')!
    
    executor.memory.inputDevices.set(inputNode.id, input)
    const inputDevice = (executor.memory.getInputDevice(inputNode.id)! as any)
    console.log("1: ENSURE SUB DIAGRAM HAS CORRECT INPUT DEVICE FOR NODE INPUT!")
    console.log({
      // SHOULD WE REALLY ALTER THE IDENTITY OF INPUT?? IT SEEMS
      // LIKE node here will refer to RunDiagram.1 and not Input.1!!!!?
      node: inputDevice.node.id,
      diagram: inputDevice.diagram.nodes.map((node: any) => node.id),
    })

    

    const execution = executor.execute()

    while(true) {
      for await(const update of execution) {
        console.log("Ok, we are in RunDiagram loop!")
        yield;
      };
    }
  },
});