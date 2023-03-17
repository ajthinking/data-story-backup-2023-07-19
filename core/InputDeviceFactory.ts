import { Diagram } from "./Diagram"
import { InputDevice, InputTree } from "./InputDevice"
import { Item } from "./Item"
import { Node } from "./Node"

export const InputDeviceFactory = {
  create: (node: Node, diagram: Diagram): InputDevice => {
    let tree: InputTree = {}

    for(const input of node.inputs) {
      tree[input.name] = {}

      for(const link of diagram.linksConnectedToPortId(input.id)) {
        tree[input.name][link.id] = []
      }
    }

    return new InputDevice(tree)
  },

  createWithItemsAtFirstLink: (
    node: Node,
    diagram: Diagram,
    inputs: {[key: string]: Item[]} = {}
  ): InputDevice => {
    let tree: InputTree = {}

    for(const input of node.inputs) {
      tree[input.name] = {}

      const connectedLinks = diagram.linksConnectedToPortId(input.id)

      if(connectedLinks.length > 1) throw new Error('Cannot create InputDevice with items at first link when there are multiple links connected to the input port')

      for(const link of connectedLinks) {
        tree[input.name][link.id] = inputs[input.name] || []
      }
    }

    return new InputDevice(tree)
  }
}