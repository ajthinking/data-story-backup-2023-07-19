import { Connection } from "reactflow";
import { NodeDescription } from "../../../server/NodeDescription";
import { DataStoryNode } from "../../Node/DataStoryNode";
import { guessConnection } from "./guessConnection";
import { guessPosition } from "./guessPosition";

export const makeNodeAndConnection = (
  existingNodes: DataStoryNode[],
  nodeDescription: NodeDescription
): [DataStoryNode, Connection | null] => {
  const scopedId = (name: string) => {
    const max = existingNodes
      .filter((node) => node.data.computer === name)
      .map((node) => node.id)
      .map((id) => id.split('.')[1])
      .map((id) => parseInt(id))
      .reduce((max, id) => Math.max(max, id), 0)

    return max + 1      
  }

  const counter = scopedId(nodeDescription.name)
  const id = `${nodeDescription.name}.${counter}`;

  const node = {
    id,
    position: guessPosition(existingNodes, nodeDescription),
    data: {
      // Ensure two nodes of same type don't share the same params object
      params: structuredClone(nodeDescription.params),
      computer: nodeDescription.name,
      label: nodeDescription.label ?? nodeDescription.name,
      inputs: nodeDescription.inputs.map((input: string) => {
        return {
          id: `${id}.${input}`,
          name: input
        }
      }),
      outputs: nodeDescription.outputs.map((input: string) => {
        return {
          id: `${id}.${input}`,
          name: input
        }
      }),
      inputSchemas: nodeDescription.inputSchemas ?? {},
      outputSchemas: nodeDescription.outputSchemas ?? {},
    },
    type: nodeDescription.name === 'Comment'
      ? "dataStoryCommentNodeComponent"
      : "dataStoryNodeComponent",
  }

  const connection = guessConnection(existingNodes, node)

  return [node, connection]
}