import * as computers from '../../core/computers';
import { NodeDescription } from '../NodeDescription';

export const describe = () => {
  const nodeDescriptions: NodeDescription[] = Object.values(computers).map((computer) => { 
    const instance = computer()
    
    return {
      name: instance.name,
      label: instance.label,
      category: instance.category,
      inputs: instance.inputs || [],
      outputs: instance.outputs ||  [],
      params: instance.params || {},
      tags: instance.tags || [],
    }
  })

  return {
    type: 'DescribeResponse',
    availableNodes: nodeDescriptions,
    stringify() {
      return JSON.stringify(this)
    }
  }
}