import { ComputerConfigFactory, RunArgs } from "../../Computer";
import { ItemWithParams } from "../../ItemWithParams";
import { DefaultParams } from "../../Param";
import { string } from "../../ParamBuilder";
import { ComputerConfig } from "../../ComputerConfig";

export const Pluck: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Pluck',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    property: string('property').get()
  },
  
  async *run({ input, output }) {
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