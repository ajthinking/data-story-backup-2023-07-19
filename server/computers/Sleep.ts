import { Computer, RunArgs } from "../Computer";
import { DefaultParams, LabelParam, NameParam } from "../Param";
import { sleep } from "../utils/sleep";

export const Sleep: Computer = {
  name: 'Sleep',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    ...DefaultParams,
  ],

  async *run({ input, output, params }: RunArgs) {
    while(true) {
      const incoming = input.pull(1)
      // await sleep(1000)
      output.push(incoming)

      yield;
    }
  },
};
