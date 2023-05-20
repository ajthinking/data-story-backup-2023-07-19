import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { DefaultParams } from '../../Param';
import { sleep } from '../../utils/sleep';
import { ComputerConfig } from '../../types/ComputerConfig';

export const InstantThrow: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'InstantThrow',
  params: {
    ...DefaultParams,
  },

  async *run({}) {
    throw Error("Instant Error!")
  },
});