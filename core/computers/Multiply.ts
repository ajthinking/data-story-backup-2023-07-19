import { Computer, ComputerFactory, RunArgs } from "../Computer"
import { DefaultParams } from "../Param"
import { number } from "../ParamBuilder"

export const Multiply: ComputerFactory = (): Computer => ({
  name: 'Multiply',  
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    factor: number('factor').value(2).get(),
  },
  
  async *run({ input, output, params: { factor } }: RunArgs) {
    while(true) {
      const incoming = input.pull()
      const products = incoming
        .map(item => (item.value as number) * factor)

      output.push(products)
      yield;
    }
  }
})