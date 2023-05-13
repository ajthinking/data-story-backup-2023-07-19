import { ComputerConfigFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";
import { ComputerConfig } from "../../ComputerConfig";

export const Ignore: ComputerConfigFactory = (): ComputerConfig => ({
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
