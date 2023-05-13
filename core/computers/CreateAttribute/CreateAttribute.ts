import { ComputerConfigFactory, RunArgs } from "../../Computer";
import { ItemWithParams } from "../../ItemWithParams";
import { DefaultParams } from "../../Param";
import { string, text } from "../../ParamBuilder";
import { ObjectItemValue } from "../../ItemValue";
import { ComputerConfig } from "../../ComputerConfig";

export const CreateAttribute: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'CreateAttribute',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    key: string('key').get(),
    value: string('value').get(),
  },

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull() as ItemWithParams<ObjectItemValue>[]
      output.push(incoming.map(item => {
        item.value[item.params.key] = item.params.value
        return item
      }))

      yield;
    }
  },
});
