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
    console.log(111111)
    throw Error('Throw node thrown an error. This is fine 🔥🔥🔥')
    console.log(222222)
  },
});
