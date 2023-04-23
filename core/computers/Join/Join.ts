import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { ItemWithParams } from "../../ItemWithParams";
import { DefaultParams } from "../../Param";
import { string } from "../../ParamBuilder";

export const Join: ComputerFactory = (): Computer => ({
  name: 'Join',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    separator: string('separator').value(',').get(),
  },

  canRun({ input }) {
    return input.haveItemsAtInput('input')
      && input.haveAllItemsAtInput('input')
  },
  
  async *run({ input, output, params }: RunArgs) {
    while(true) {
      console.log("RUNING JOIN TO MANY TIMES???")

      const incoming = input.pull()
      const joined = incoming.map(({ value }) => value).join(params.separator)

      output.push([joined])

      yield;
    }
  },
});