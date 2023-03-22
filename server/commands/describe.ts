import * as computers from '../../core/computers';
import { Param } from '../../core/Param';

export type NodeDescription = {
  name: string,
  inputs: string[],
  outputs: string[],
  params: Param[],
}

export const describe = () => {
  const nodeDescriptions: NodeDescription[] = Object.values(computers).map((computer) => { 
    const instance = computer()
    
    return {
      name: instance.name,
      inputs: instance.inputs || [],
      outputs: instance.outputs ||  [],
      params: instance.params || [],
    }
  })

  return {
    type: 'describeResponse',
    availableNodes: nodeDescriptions,
    stringify() {
      return JSON.stringify(this)
    }
  }
}