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
    const instance = computer()

    console.log({
      name: instance.name,
      inputs: instance.inputs || [],
      outputs: instance.outputs ||  [],
      params: instance.params || [],
    })
    
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