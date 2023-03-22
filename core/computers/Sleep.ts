import { Computer, RunArgs } from "../Computer";
import { DefaultParams, LabelParam, NameParam } from "../Param";
import { sleep } from "../utils/sleep";

const DurationParam = {
  id: 'duration',
  name: 'duration',
  type: 'number',
  value: 1000,      
}

export const Sleep = () => ({
  name: 'Sleep',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    ...DefaultParams,
    DurationParam,
  ],

  async *run({ input, output, params }: RunArgs) {
    
    while(true) {
      const incoming = input.pull(1)
      await sleep(params.duration.value)
      output.push(incoming)

      yield;
    }
  },
});


