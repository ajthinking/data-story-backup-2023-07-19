import { Computer } from '../core/Computer';
import * as computers from '../core/computers';

type NodeDescription = {
  name: string,
  inputs: string[],
  outputs: string[],
  params: any[],
}

const nodeDescriptions: NodeDescription[] = [
  computers.CreateJson,
  computers.Pass,
  computers.Ignore,
  computers.Contacts,
].map((computer) => { 
  return {
    name: computer.name,
    inputs: computer.inputs || [],
    outputs: computer.outputs ||  [],
    params: computer.params || [],
  }
})


export class Server {
  ping() {}

  describe() {
    return {
      type: 'describeResponse',
      availableNodes: nodeDescriptions,
    }
  }
  
  run() {}
}