import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams } from "../Param";

export const Throw: ComputerFactory = (): Computer => ({
  name: 'Throw',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  async *run({ input }: RunArgs) {
    console.log("Running the throw node")
    input.pull()
    console.log("Pulled...")
    throw Error('Throw node thrown an error')
  },
});
