import { ComputerConfigFactory, RunArgs } from "../../Computer";
import { ComputerConfig } from "../../ComputerConfig";
import { DefaultParams } from "../../Param";
import { number } from "../../ParamBuilder";
import { sleep } from "../../utils/sleep";

export const Signal: ComputerConfigFactory = (): ComputerConfig => ({
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
