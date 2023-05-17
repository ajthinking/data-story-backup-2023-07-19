import { SerializedReactFlow } from "../components/Workbench/SerializedReactFlow"
import { Diagram } from "./Diagram"
import { Link } from "./Link"
import { Node } from "./Node"
import { Port } from "./Port"

export const DiagramFactory = {
  fromReactFlow(flow: SerializedReactFlow): Diagram {    
    const nodes = flow.nodes.map(flowNode => {
      return new Node({
        id: flowNode.id,
        type: flowNode.data.computer,
        inputs: flowNode.data.inputs.map(input => {
          // This should be passed in a property
          return new Port(input.id, input.id.split(".").pop()!)
        }),
        outputs: flowNode.data.outputs.map(output => {
          // This should be passed in a property
          return new Port(output.id, output.id.split(".").pop()!)
        }),
        // continue with PARAMS here!
        params: flowNode.data.params || {},   
      })
    })

    const links = flow.edges.map(edge => {
      return new Link(edge.id, edge.sourceHandle!, edge.targetHandle!)
    })

    return new Diagram(nodes, links)
  }
}