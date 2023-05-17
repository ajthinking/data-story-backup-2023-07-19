import { ComputerConfigFactory, RunArgs } from "../../types/Computer";
import { DefaultParams } from "../../Param";
import { ComputerConfig } from "../../types/ComputerConfig";

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
