import { ComputerConfigFactory, RunArgs } from "../../types/Computer";
import { ItemWithParams } from "../../ItemWithParams";
import { DefaultParams } from "../../Param";
import { string, text } from "../../ParamBuilder";
import { ObjectItemValue } from "../../types/ItemValue";
import { ComputerConfig } from "../../types/ComputerConfig";

export const ConsoleLog: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'ConsoleLog',
  label: 'Console.log',
  inputs: ['input'],
  params: {
    ...DefaultParams,
    message: string('message').get(),
  },

  async *run({ input, hooks }) {
    console.log('ConsoleLog run started!')

    while(true) {
      const incoming = input.pull() as ItemWithParams<ObjectItemValue>[]

      for(const item of incoming) {
        hooks.register({
          type: 'CONSOLE_LOG',
          args: [item.params.message]
        })
      }

      yield;
    }
  },
});
