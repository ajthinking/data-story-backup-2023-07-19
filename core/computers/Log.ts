import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams } from "../Param";

export const Log: ComputerFactory = (): Computer => ({
  name: 'Log',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  async *run({ input, output }: RunArgs) {
    while(true) {
      const incoming = input.pull()
      
      console.group(`Logging items`)
      console.log(JSON.stringify(incoming, null, 2))
      console.groupEnd()

      output.push(incoming)

      yield;
    }
  },
});