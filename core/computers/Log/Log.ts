import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Log: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Log',
  inputs: ['input'],

  async *run({ input, output }) {
    console.log("First time in Log!")
    while(true) {
      // log the *item* - not ItemWithParams
      const incoming = input.pull().map(i => i.value)

      console.log("FIRST TIME IN LOGG WITH A ITEM!!")
      
      console.log(JSON.stringify(incoming, null, 2))
      console.groupEnd()

      yield;
    }
  },
});