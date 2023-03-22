import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams } from "../Param";
import { number } from "../ParamBuilder";
import { sleep } from "../utils/sleep";

export const Signal: ComputerFactory = (): Computer => ({
  name: 'Signal',
  inputs: [],
  outputs: ['output'],
  params: [
    ...DefaultParams,
    number('period').value(100).get(),
    number('count').value(10).get(),
  ],

  async *run({
    output,
    params: { period, count}
  }: RunArgs) {
    let i = 1;

    while(i <= count) {
      await sleep(period)
      output.push([i++])

      yield;
    }
  },
});
