import { Computer, RunArgs } from "../Computer";
import { DefaultParams, LabelParam, NameParam } from "../Param";

export const Pass: Computer = {
  name: 'Pass',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    ...DefaultParams,
  ],
  
  async *run({ input, output }: RunArgs) {
    while(true) {
      const incoming = input!.pull()
      output.push(incoming)

      yield;
    }
  },
};
