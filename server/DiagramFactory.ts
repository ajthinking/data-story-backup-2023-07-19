import { Diagram } from "./Diagram"

export class DiagramFactory {
  registerNodes(): this {
    return this
  }

  parse(diagramJson: string): Diagram {
    const data = JSON.parse(diagramJson)
    
    const nodes = data.nodes.map((nodeData: Object) => {

    })

    const edges = data.links

    return new Diagram(nodes, edges)
  }
}