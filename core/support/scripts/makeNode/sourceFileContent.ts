export const sourceFileContent = (name: string) => `import { Computer, ComputerFactory, RunArgs } from '../../Computer';
import { DefaultParams } from '../../Param';

export const ${name}: ComputerFactory = (): Computer => ({
  name: '${name}',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
  },

  async *run({ input, output, params }) {
    while(true) {
      const incoming = input.pull()
      output.push(incoming)

      yield;
    }
  },
});
`;