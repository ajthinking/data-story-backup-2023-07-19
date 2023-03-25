import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams } from "../Param";

export const View: ComputerFactory = (): Computer => ({
  name: 'View',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  canRun({ input }) {
    return input.hasAllItems()
  },

  async *run({ input, storage }: RunArgs) {
    storage.put(input.pull())
  },
});
