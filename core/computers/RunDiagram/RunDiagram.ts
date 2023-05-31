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

export const RunDiagram: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'RunDiagram',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    path: string('path').get(),
  },
  
  async *run({ executorFactory }) {
    // const data = JSON.parse(await fs.readFile(params.path, 'utf8'))
    // const diagram = DiagramFactory.fromReactFlow(data)

    const diagram = new DiagramBuilder()
      .add(Signal, { period: 1, count: 10 })
      .add(Ignore)
      .get()

    const executor = executorFactory!(diagram)

    const execution = executor.execute()

    for await(const update of execution) {
      // Something have changed in the diagram
      // Can we push something to output?
      // Should it do it itself?
      yield
    }
  },
});