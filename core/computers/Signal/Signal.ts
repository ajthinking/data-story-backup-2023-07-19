import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";
import { number } from "../../ParamBuilder";
import { sleep } from "../../utils/sleep";

export const Signal: ComputerFactory = (): Computer => ({
  name: 'Signal',
  inputs: [],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    period: number('period').value(50).get(),
    count: number('count').value(500).get(),
  },

  async *run({
    output,
    params: { period, count}
  }) {
    let i = 1;

    while(i <= count) {
      await sleep(period)
      output.push([{
        id: i++
      }])

      yield;
    }
  },
});
