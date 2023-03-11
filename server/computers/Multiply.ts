import { Computer, RunArgs } from "../Computer"

export const Multiply: Computer = {
  async *run({ input, output }: RunArgs) {
    const FACTOR = 2

    while(true) {
      const incoming = input.pull() as number[]
      const products = incoming.map(n => n * FACTOR)

      output.push(products)
      yield;
    }
  }
}