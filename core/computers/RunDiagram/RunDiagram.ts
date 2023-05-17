import { ComputerConfigFactory, RunArgs } from "../../types/Computer";
import { DiagramFactory } from "../../DiagramFactory";
import { DefaultParams } from "../../Param";
import { string } from "../../ParamBuilder";
import { promises as fs } from 'fs'
import { ComputerConfig } from "../../types/ComputerConfig";

export const RunDiagram: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'RunDiagram',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    path: string('path').get(),
  },
  
  async *run({ input, output, params, storage }) {
    const data = JSON.parse(await fs.readFile(params.path, 'utf8'))
    const diagram = DiagramFactory.fromReactFlow(data)
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