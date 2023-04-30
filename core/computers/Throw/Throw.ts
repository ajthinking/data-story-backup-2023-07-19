import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";
import { string } from "../../ParamBuilder";

export const Throw: ComputerFactory = (): Computer => ({
  name: 'Throw',
  inputs: ['input'],
  params: {
    ...DefaultParams,
    message: string('message').value('Some error').get()
  },

  async *run({ input }: RunArgs) {
    const [item] = input.pull(1)
    throw Error(item.params.message)
  },
});
