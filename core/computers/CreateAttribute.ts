import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { ObjectItemValue } from "../ItemValue";
import { ItemWithParams } from "../ItemWithParams";
import { DefaultParams } from "../Param";
import { string } from "../ParamBuilder";

export const CreateAttribute: ComputerFactory = (): Computer => ({
  name: 'CreateAttribute',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    key: string('key').value('foo').get(),
    value: string('value').value('bar').get(),
  },

  async *run({ input, output, params }: RunArgs) {
    while(true) {
      const incoming = input.pull() as ItemWithParams<ObjectItemValue>[]
      
      const outcoming = incoming.map((item) => {
        item.value[params.key] = item.params.value
        return item
      })

      output.push(outcoming)

      yield;
    }
  },
});
