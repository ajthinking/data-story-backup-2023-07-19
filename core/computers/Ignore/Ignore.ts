import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";

export const Ignore: ComputerFactory = (): Computer => ({
  name: 'Ignore',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  async *run({ input }) {
    while(true) {
      input.pull()
      yield;
    }
  },
});
