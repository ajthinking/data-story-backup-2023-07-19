import { Computer, ComputerFactory, RunArgs } from "../Computer"
import { DefaultParams } from "../Param"

export const Multiply: ComputerFactory = () => ({
  name: 'Multiply',  
  inputs: ['input'],
  outputs: ['output'],
  params: [
    ...DefaultParams,
    {
      id: 'factor',
      name: 'factor',
      type: 'number',
      value: 2,
    }
  ],
  
  async *run({ input, output, params }: RunArgs) {
    while(true) {
      const incoming = input.pull() as number[]
      const products = incoming.map(n => n * params.factor)

      output.push(products)
      yield;
    }
  }
})