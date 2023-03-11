type NodeOptions = {
  id?: string
  inputs: [],
  outputs: [],
}

export class Node {
  id: string
  inputs: any[]
  outputs: any[]

  constructor(options: NodeOptions) {
    this.id = options.id || Math.random().toString(36).substr(2, 9)
    this.inputs = options.inputs
    this.outputs = options.outputs
  }
}