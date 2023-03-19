import * as computers from '../../core/computers';

export const describe = () => {

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
    computers.Signal,
  ].map((computer) => { 
    return {
      name: computer.name,
      inputs: computer.inputs || [],
      outputs: computer.outputs ||  [],
      params: computer.params || [],
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