import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ItemWithParams } from '../../ItemWithParams';
import { DefaultParams } from '../../Param';
import { string } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Join: ComputerConfigFactory = (): ComputerConfig => ({
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
  
  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull()
      const joined = incoming.map(({ value }) => value).join(params.separator)

      output.push([joined])

      yield;
    }
  },
});