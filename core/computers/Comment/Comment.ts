import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { DefaultParams } from '../../Param';
import { json, string } from '../../ParamBuilder';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Comment: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Comment',
  inputs: [],
  outputs: [],
  params: {
    ...DefaultParams,
    content: json('content').value('This is a comment').get(),
  },

  async *run({}) {},
});
