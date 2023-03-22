export const sourceFileContent = (name: string) => `import { Computer, RunArgs } from "../Computer";
import { DefaultParams, LabelParam, NameParam } from "../Param";

export const ${name}: ComputerFactory = (): Computer => ({
  name: '${name}',
  inputs: ['input'],
  outputs: ['output'],
  params: [
    ...DefaultParams,
  ],

  async *run({ input, output, params }: RunArgs) {
    while(true) {
      const incoming = input.pull()
      output.push(incoming)

      yield;
    }
  },
});
`;