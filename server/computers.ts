const computers = new Map<string, any>

type RunArgs = {
  input: {
    pull: () => {}
  },
  output: {
    push: (items: any[]) => {}
  }
}

computers.set('Multiply', {
  async *run({ input, output }: RunArgs) {
    const FACTOR = 2

    const incoming = input.pull() as number[]
    const products = incoming.map(n => n * FACTOR)
    
    output.push(products)
  }
})

export { computers }