import { Computer, RunArgs } from "../Computer";
import { DefaultParams, LabelParam, NameParam } from "../Param";

export const Accept: Computer = {
  name: 'Accept',
  inputs: ['input'],
  params: [
    ...DefaultParams,
  ],

  async *run({ input }: RunArgs) {
    while(true) {
      const incoming = input.pull()
      yield;
    }
  },
};
