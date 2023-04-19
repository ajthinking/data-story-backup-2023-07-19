import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";

export const Filter: ComputerFactory = (): Computer => ({
  name: 'Filter',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
  },

  async *run({ input, output, params }: RunArgs) {
    while(true) {
      const incoming = input.pull()
      output.push(incoming)

      yield;
    }
  },
});
