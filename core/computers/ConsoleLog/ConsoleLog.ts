import { ComputerConfigFactory, RunArgs } from '../../types/Computer';
import { ItemWithParams } from '../../ItemWithParams';
import { DefaultParams } from '../../Param';
import { string, text } from '../../ParamBuilder';
import { ObjectItemValue } from '../../types/ItemValue';
import { ComputerConfig } from '../../types/ComputerConfig';

export const ConsoleLog: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'ConsoleLog',
  label: 'Console.log',
  inputs: ['input'],
  params: {
    ...DefaultParams,
    message: string('message').get(),
  },

  async *run({ input, hooks, params: rawParams }) {
    console.log('ConsoleLog run started!')

    while(true) {
      const incoming = input.pull() as ItemWithParams<ObjectItemValue>[]

      for(const item of incoming) {

        console.log({
          rawParams,
        })

        hooks.register({
          type: 'CONSOLE_LOG',
          args: [
            // If nothing passed log the whole item 
            rawParams.message === undefined ? item.value: item.params.message
          ]
        })
      }

      yield;
    }
  },
});
