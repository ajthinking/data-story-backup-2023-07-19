import { Computer, RunArgs } from "../../Computer";

export const Contacts: Computer = {
  name: 'Contacts',  
  outputs: ['all'],

  async *run({ output, params }: RunArgs) {
    while(true) {
      const json = '[{"id": 1}, {"id": 2}, {"id": 3}]'
      // const json = params.json.value // TODO return to this
      output.push(JSON.parse(json))
      yield;
    }
  },
};
