import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { ObjectItemValue } from "../../ItemValue";
import { DefaultParams } from "../../Param";
import { string } from "../../ParamBuilder";

export const Filter: ComputerFactory = (): Computer => ({
  name: 'Filter',
  inputs: ['input'],
  outputs: ['passed', 'failed'],
  params: {
    ...DefaultParams,
    left: string('left').get(),
    // operator: string('operator').get(), // only support equals for now
    right: string('right').get(),
  },
  
  async *run({ input, output }) {
    while(true) {
      const incoming = input!.pull() as ObjectItemValue[]

      
      incoming.forEach(item => {
        if(item.params.left === item.params.right) {
          return output.pushTo('passed', [item])
        }

        output.pushTo('failed', [item])
      })

      console.log('Filter run done!')

      yield;
    }
  },
});