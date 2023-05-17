import { ComputerConfigFactory, RunArgs } from "../../types/Computer";
import { DefaultParams } from "../../Param";
import { json } from "../../ParamBuilder";
import { ComputerConfig } from "../../types/ComputerConfig";

export const CreateJson: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'CreateJson',  
  outputs: ['output'],
  params: {
    ...DefaultParams,
    json: json('json').value(`[{ "name": "John"}]`).get(),
  },

  async *run({ output, params: { json } }) {
    try {
      const parsed = JSON.parse(json)
      output.push(
        // wraps the parsed json in an array if it's not already an array
        [parsed].flat()
      )
    } catch(error) {
      throw error;
    }
  },
});
