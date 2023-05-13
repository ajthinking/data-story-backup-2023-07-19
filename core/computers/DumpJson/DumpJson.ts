import { ComputerConfigFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";
import { ComputerConfig } from "../../ComputerConfig";

export const DumpJson: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'DumpJson',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  // canRun({ input }) {
  //   return input.hasAllItems()
  // },

  async *run({ input, storage }) {
    const id = (Math.random() + 1).toString(36).substring(7);
    const key = `${this.name}-${id}`

    storage?.putExecutionItems(key, input.pull())
  },
});
