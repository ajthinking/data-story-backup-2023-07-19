import { ComputerConfigFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";
import { string } from "../../ParamBuilder";
import { ComputerConfig } from "../../ComputerConfig";

export const Throw: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Throw',
  inputs: ['input'],
  params: {
    ...DefaultParams,
    message: string('message').value('Some error').get()
  },

  async *run({ input }) {
    const [item] = input.pull(1)
    throw Error(item.params.message)
  },
});
