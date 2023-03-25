import axios from "axios";
import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { DefaultParams } from "../Param";
import { json, select, string } from "../ParamBuilder";

export const Request: ComputerFactory = (): Computer => ({
  name: 'Request',
  outputs: ['output'],
  params: {
    ...DefaultParams,
    url: string('url').value('https://jsonplaceholder.typicode.com/todos').get(),
    method: select('method').options(['GET', 'POST', 'PUT', 'DELETE']).get().value('GET'),
    body: json('body').value('{}').get(),
    config: json('config').value('{}').get(),
  },

  async *run({ output, params: { url, method, body, config } }: RunArgs) {
    if(method === 'GET') {
      const response = await axios.get(url, config)
      output.push(await response.data)
    }

    if(method === 'POST') {
      const response = await axios.post(url, body, config)
      output.push(await response.data)
    }
    
    yield    
  },
});
