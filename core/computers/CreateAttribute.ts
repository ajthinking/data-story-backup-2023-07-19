import { Computer, ComputerFactory, RunArgs } from "../Computer";
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
      const incoming = input.pull()
      const outcoming = incoming.map((item: any) => {
        item[params.key] = params.value
        return item
      })

      output.push(outcoming)

      yield;
    }
  },
});
