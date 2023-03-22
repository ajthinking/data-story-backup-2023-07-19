import axios from "axios";
import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams } from "../Param";
import { select, string } from "../ParamBuilder";

export const Request: ComputerFactory = (): Computer => ({
  name: 'Request',
  outputs: ['output'],
  params: [
    ...DefaultParams,
    string('url').value('https://jsonplaceholder.typicode.com/todos').get(),
    select('method').options(['GET', 'POST', 'PUT', 'DELETE']).get(),
  ],

  async *run({ output, params: { url } }: RunArgs) {
    const response = await axios.get(url)
    output.push(await response.data)
    
    yield
  },
});
