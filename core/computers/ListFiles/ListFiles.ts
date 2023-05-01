import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";
import { string } from "../../ParamBuilder";
import { promises as fs } from 'fs'
import * as nodePath from 'path'

export const ListFiles: ComputerFactory = (): Computer => ({
  name: 'ListFiles',
  inputs: ['input'],
  outputs: ['output'],
  params: {
    ...DefaultParams,
    path: string('path').value('/').get(),
  },

  async *run({ input, output }) {
    while(true) {
      const [ { params: { path } } ] = input.pull(1)

      const entries = (await fs.readdir(path, { withFileTypes: true }))
        .map((entry) => {
          return {
            name: entry.name,
            type: entry.isDirectory() ? 'directory' : 'file',
            fullPath: nodePath.join(path, entry.name),
          };
      });      

      output.push(entries)

      yield;
    }
  },
});
