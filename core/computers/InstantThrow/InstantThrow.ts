import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";
import { sleep } from "../../utils/sleep";

export const InstantThrow: ComputerFactory = (): Computer => ({
  name: 'InstantThrow',
  params: {
    ...DefaultParams,
  },

  async *run({}) {
    throw Error("Instant Error!")
  },
});