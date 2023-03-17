import { Diagram } from "./Diagram"
import { OutputDevice, OutputTree } from "./OutputDevice"
import { Node } from "./Node"

export const OutputDeviceFactory = {
  create: (node: Node, diagram: Diagram): OutputDevice => {
    let tree: OutputTree = {}

    for(const output of node.outputs) {
      tree[output.name] = {}

      for(const link of diagram.linksConnectedToPortId(output.id)) {
        tree[output.name][link.id] = []
      }
    }

    const linkCounts = new Map<string, number>();

    return new OutputDevice(tree, linkCounts)
  }
}