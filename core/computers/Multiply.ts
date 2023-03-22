import { Computer, ComputerFactory, RunArgs } from "../Computer"
import { DefaultParams } from "../Param"
import { number } from "../ParamBuilder"

export const Multiply: ComputerFactory = (): Computer => ({
  name: 'Multiply',  
  inputs: ['input'],
  outputs: ['output'],
  params: [
    ...DefaultParams,
    number('factor').value(2).get(),
  ],
  
  async *run({ input, output, params: { factor} }: RunArgs) {
    while(true) {
      const incoming = input.pull() as number[]
      const products = incoming.map(n => n * factor)

      output.push(products)
      yield;
    }
  }
})