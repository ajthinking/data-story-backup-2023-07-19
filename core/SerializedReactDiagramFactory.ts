import { SerializedReactFlow } from "../components/Workbench/SerializedReactFlow"
import { Diagram } from "./Diagram"
import { ComputerRegistry } from "../server/computerRegistry"

export const SerializedReactDiagramFactory = {
  fromDiagram: (diagram: Diagram): SerializedReactFlow => {

    return {
      nodes: diagram.nodes.map(node => {
        const computer = ComputerRegistry.descriptions()
          .find(computer => computer.name === node.type)!

        return {
          // "width": 128,
          // "height": 52,
          "id": node.id,
          "position": {
            "x": node.position!.x,
            "y": node.position!.y
          },
          data: {
            params: node.params,
            "computer": node.type,
            "label": (node?.params?.label?.value || node.type) as string,
            "inputs": computer.inputs,
            "outputs": computer.outputs,  
          }
        }
      }),
      edges: [],
      "viewport": {
        "x": 0,
        "y": 0,
        "zoom": 1
      }      
    }   
  },
}