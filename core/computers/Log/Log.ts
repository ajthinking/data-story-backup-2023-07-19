import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";

export const Log: ComputerFactory = (): Computer => ({
  name: 'Log',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  async *run({ input, output }) {
    while(true) {
      // log the *item* - not ItemWithParams
      const incoming = input.pull().map(i => i.value)
      
      console.log(JSON.stringify(incoming, null, 2))
      console.groupEnd()

      yield;
    }
  },
});