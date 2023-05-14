import { ComputerConfigFactory, RunArgs } from "../../Computer";
import { ItemWithParams } from "../../ItemWithParams";
import { DefaultParams } from "../../Param";
import { string, text } from "../../ParamBuilder";
import { ObjectItemValue } from "../../ItemValue";
import { ComputerConfig } from "../../ComputerConfig";

export const ConsoleLog: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'ConsoleLog',
  label: 'Console.log',
  inputs: ['input'],
  params: {
    ...DefaultParams,
    message: string('message').get(),
  },

  async *run({ input, hooks }) {
    while(true) {
      const incoming = input.pull() as ItemWithParams<ObjectItemValue>[]
      
      hooks.register({
        type: 'CONSOLE_LOG',
        args: incoming.map(item => item.params.message)
      })

      yield;
    }
  },
});
