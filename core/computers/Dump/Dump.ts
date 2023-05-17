import { ComputerConfigFactory, RunArgs } from "../../types/Computer";
import { ItemWithParams } from "../../ItemWithParams";
import { DefaultParams } from "../../Param";
import { string, text } from "../../ParamBuilder";
import { ObjectItemValue } from "../../types/ItemValue";
import { ComputerConfig } from "../../types/ComputerConfig";

export const Dump: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'Dump',
  inputs: ['input'],
  params: {
    ...DefaultParams,
  },

  async *run({ input, hooks }) {
    while(true) {
      const incoming = input.pull() as ItemWithParams<ObjectItemValue>[]
      
      hooks.register({
        type: 'CONSOLE_LOG',
        args: ['Dump: http://localhost:3000/api/names']
      })

      yield;
    }
  },
});
