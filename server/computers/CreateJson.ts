import { Computer, RunArgs } from "../Computer";

export const CreateJson: Computer = {
  name: 'CreateJson',  
  outputs: ['output'],

  async *run({ output }: RunArgs) {
    while(true) {
      const json = '[{"id": 1}, {"id": 2}, {"id": 3}]'
      output.push(JSON.parse(json))
      yield;
    }
  },
};
