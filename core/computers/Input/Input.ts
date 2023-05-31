import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Input: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Input',
  outputs: ['output'],
  
  async *run({ input, output }) {
    while(true) {
      const incoming = input!.pull()
      output.push(incoming)

      yield;
    }
  },
});
