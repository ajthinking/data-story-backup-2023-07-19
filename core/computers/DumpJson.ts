import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams } from "../Param";

export const DumpJson: ComputerFactory = (): Computer => ({
  name: 'DumpJson',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  canRun({ input }) {
    return input.hasAllItems()
  },

  async *run({ input, storage }: RunArgs) {
    storage.putExecutionItems(input.pull())
  },
});
