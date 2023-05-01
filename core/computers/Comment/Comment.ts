import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";
import { json, string } from "../../ParamBuilder";

export const Comment: ComputerFactory = (): Computer => ({
  name: 'Comment',
  inputs: [],
  outputs: [],
  params: {
    ...DefaultParams,
    content: json('content').value('This is a comment').get(),
  },

  async *run({}) {},
});
