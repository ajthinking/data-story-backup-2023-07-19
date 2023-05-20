export const sourceFileContent = (name: string) => `import { Computer, ComputerFactory, RunArgs } from '../../Computer';

export const ${name}: ComputerFactory = (): Computer => ({
  name: '${name}',
  inputs: ['input'],
  outputs: ['output'],

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull()
      output.push(incoming)

      yield;
    }
  },
});
`;