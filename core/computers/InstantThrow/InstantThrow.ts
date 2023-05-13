import { ComputerConfigFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";
import { sleep } from "../../utils/sleep";
import { ComputerConfig } from "../../ComputerConfig";

export const InstantThrow: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'InstantThrow',
  params: {
    ...DefaultParams,
  },

  async *run({}) {
    throw Error("Instant Error!")
  },
});