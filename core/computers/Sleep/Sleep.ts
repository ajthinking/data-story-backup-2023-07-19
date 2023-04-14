import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";
import { number } from "../../ParamBuilder";
import { sleep } from "../../utils/sleep";

export const Sleep: ComputerFactory = (): Computer => ({
  name: 'Sleep',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    duration: number('duration').value(100).get()
  },

  async *run({ input, output }: RunArgs) {
    while(true) {
      const [ { value, params: { duration } } ] = input.pull(1)
      await sleep(duration)
      output.push([value])

      yield;
    }
  },
});