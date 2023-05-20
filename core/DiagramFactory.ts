import { SerializedReactFlow } from '../components/Workbench/SerializedReactFlow'
import { Diagram } from './Diagram'
import { Node } from './types/Node'
import { Port } from './types/Port'
import { Link } from './types/Link'

export const DiagramFactory = {
  fromReactFlow(flow: SerializedReactFlow): Diagram {    
    const nodes = flow.nodes.map(flowNode => {
      return {
        id: flowNode.id,
        type: flowNode.data.computer,
        inputs: flowNode.data.inputs.map(input => {
          // This should be passed in a property
          return { id: input.id, name: input.id.split(".").pop()!}
        }),
        outputs: flowNode.data.outputs.map(output => {
          // This should be passed in a property
          return { id: output.id, name: output.id.split(".").pop()!}
        }),
        // continue with PARAMS here!
        params: flowNode.data.params || {},   
      }
    })

    const links: Link[] = flow.edges.map(edge => {
      return {
        id: edge.id,
        sourcePortId: edge.sourceHandle!,
        targetPortId: edge.targetHandle!
      }
    })

    return new Diagram(nodes, links)
  }
}