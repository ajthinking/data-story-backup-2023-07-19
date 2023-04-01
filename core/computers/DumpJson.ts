import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams } from "../Param";

export const DumpJson: ComputerFactory = (): Computer => ({
  name: 'DumpJson',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  // canRun({ input }) {
  //   return input.hasAllItems()
  // },

  async *run({ input, storage }: RunArgs) {
    const id = (Math.random() + 1).toString(36).substring(7);
    const key = `${this.name}-${id}`

    storage?.putExecutionItems(key, input.pull())
  },
});
