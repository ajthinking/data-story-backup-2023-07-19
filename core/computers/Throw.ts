import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams } from "../Param";

export const Throw: ComputerFactory = (): Computer => ({
  name: 'Throw',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  async *run({ input }: RunArgs) {
    input.pull()
    throw Error('Some error')
  },
});
