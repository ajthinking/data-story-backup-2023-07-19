import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams, LabelParam, NameParam } from "../Param";
import { sleep } from "../utils/sleep";

export const Signal: ComputerFactory = () => ({
  name: 'Signal',
  inputs: [],
  outputs: ['output'],
  params: [
    ...DefaultParams,
    {
      id: 'period',
      name: 'period',
      type: 'number',
      value: 1000,
    }
  ],

  async *run({ output, params }: RunArgs) {
    let i = 1;

    while(true) {
      await sleep(params.period)
      output.push([i++])

      yield;
    }
  },
});
