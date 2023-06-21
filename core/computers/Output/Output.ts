import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Output: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Output',
  inputs: ['input'],
  
  async *run({ input, output }) {
    while(true) {
      const incoming = input!.pull()
      output.push(incoming)

      yield;
    }
  },
});
