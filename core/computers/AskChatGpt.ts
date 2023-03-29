import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams } from "../Param";

export const AskChatGpt: ComputerFactory = (): Computer => ({
  name: 'AskChatGpt',
  inputs: ['input'],
  outputs: ['suggestions', 'scores', 'tokens_used'],
  params: {
    ...DefaultParams,
  },

  async *run({ input, output, params }: RunArgs) {
    while(true) {
      const incoming = input.pull()
      output.pushTo('suggestions', incoming)

      yield;
    }
  },
});
