import { Port } from "./Port"

export type NodeId = string

export type NodeOptions = {
  id: NodeId,
  type: string,  
  inputs: Port[],
  outputs: Port[],
}

export class Node {
  id: NodeId
  type: string
  inputs: Port[]
  outputs: Port[]

  constructor(options: NodeOptions) {
    this.id = options.id
    this.type = options.type
    this.inputs = options.inputs
    this.outputs = options.outputs
  }
}