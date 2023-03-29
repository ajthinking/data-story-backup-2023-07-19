import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams } from "../Param";
import { string } from "../ParamBuilder";
import { promises as fs } from 'fs'

export const JsonFile: ComputerFactory = (): Computer => ({
  name: 'JsonFile',
  outputs: ['output'],
  params: {
    ...DefaultParams,
    path: string('path').value('./.datastory/names.json').get(),
  },

  async *run({ output, params }: RunArgs) {
    // TODO: Consider reading using a stream/generator
    const content = await fs.readFile(params.path, 'utf8')
    const items = JSON.parse(content)
    output.push(items)

    yield;
  },
});
