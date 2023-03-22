import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams, LabelParam, NameParam } from "../Param";

export const Ignore: ComputerFactory = (): Computer => ({
  name: 'Ignore',
  inputs: ['input'],
  params: [
    ...DefaultParams,
  ],

  async *run({ input }: RunArgs) {
    while(true) {
      input.pull()
      yield;
    }
  },
});
