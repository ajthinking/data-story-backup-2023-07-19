import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { ItemWithParams } from "../../ItemWithParams";
import { DefaultParams } from "../../Param";
import { string } from "../../ParamBuilder";

export const Pluck: ComputerFactory = (): Computer => ({
  name: 'Pluck',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    property: string('property').get()
  },
  
  async *run({ input, output }: RunArgs) {
    while(true) {
      const incoming = input!.pull() as ItemWithParams<{
        [key: string]: any
      }>[]

      output.push(incoming.map(i => i.value[
        i.params.property
      ]))

      yield;
    }
  },
});