import { Computer, RunArgs } from "../Computer";
import { DefaultParams, LabelParam, NameParam } from "../Param";
import { sleep } from "../utils/sleep";

export const Signal: Computer = {
  name: 'Signal',
  inputs: [],
  outputs: ['output'],
  params: [
    ...DefaultParams,
  ],

  async *run({ input, output }: RunArgs) {
    let i = 1;

    while(true) {
      await sleep(1000)
      output.push([i++])

      yield;
    }
  },
};
