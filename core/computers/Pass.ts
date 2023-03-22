import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams, LabelParam, NameParam } from "../Param";

export const Pass: ComputerFactory = () => ({
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
});
