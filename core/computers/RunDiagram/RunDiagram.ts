import { computerRegistry } from "../../../server/computerRegistry";
import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { DiagramFactory } from "../../DiagramFactory";
import { Executor } from "../../Executor";
import { DefaultParams } from "../../Param";
import { string } from "../../ParamBuilder";
import { promises as fs } from 'fs'

export const RunDiagram: ComputerFactory = (): Computer => ({
  name: 'RunDiagram',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    path: string('path').get(),
  },
  
  async *run({ input, output, params, storage }) {
    const data = JSON.parse(await fs.readFile(params.path, 'utf8'))
    const diagram = new DiagramFactory().fromReactFlow(data)
    // const executor = new Executor(
    //   diagram,
    //   computerRegistry, // circular dependency?
    //   storage!
    // )

    // const execution = executor.execute()

    // for await(const update of execution) {
    //   // Something have changed in the diagram
    //   // Can we push something to output?
    //   // Should it do it itself?
    //   yield
    // }
  },
});