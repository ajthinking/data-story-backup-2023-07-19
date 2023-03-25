import * as computers from '../../core/computers';
import { Param } from '../../core/Param';

export type NodeDescription = {
  name: string,
  inputs: string[],
  outputs: string[],
  params: Record<string, Param>,
  tags: string[],
}

export const describe = () => {
  const nodeDescriptions: NodeDescription[] = Object.values(computers).map((computer) => { 
    const instance = computer()
    
    return {
      name: instance.name,
      inputs: instance.inputs || [],
      outputs: instance.outputs ||  [],
      params: instance.params || {},
      tags: instance.tags || [],
    }
  })

  console.log(
    JSON.stringify(nodeDescriptions, null, 2)
  )

  return {
    type: 'describeResponse',
    availableNodes: nodeDescriptions,
    stringify() {
      return JSON.stringify(this)
    }
  }
}