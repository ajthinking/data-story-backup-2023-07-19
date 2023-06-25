import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ComputerConfig } from '../../types/ComputerConfig';

export const Input: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Input',
  outputs: ['output'],
  
  async *run({ input, output }) {
    console.log("Im in Input (Deep)!")
    console.log("2: ENSURE SUB DIAGRAM HAS CORRECT INPUT DEVICE FOR NODE INPUT!")

    // throw new Error("STOPPING HERE")

    while(true) {
      console.log("About to pull deep!")
      const incoming = input.pull()
      console.log("Pulled deep!")
      console.log("About to push deep!")
      output.push(incoming)
      console.log("Pushed deep!")

      yield;
    }
  },
});
