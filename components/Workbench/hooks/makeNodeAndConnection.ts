import { NodeDescription } from "../../../server/commands/describe";
import { guessConnection } from "./guessConnection";
import { guessPosition } from "./guessPosition";

export const makeNodeAndConnection = (existingNodes: any[], nodeDescription: NodeDescription) => {
  const scopedId = (name: string) => {
    const max = existingNodes
      .filter((node: any) => node.data.computer === name)
      .map((node: any) => node.id)
      .map((id: string) => id.split('.')[1])
      .map((id: string) => parseInt(id))
      .reduce((max: number, id: number) => Math.max(max, id), 0)

    return max + 1      
  }

  const counter = scopedId(nodeDescription.name)
  const id = `${nodeDescription.name}.${counter}`;

  const node = {
    id,
    position: guessPosition(existingNodes, nodeDescription),
    data: {
      params: nodeDescription.params,
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
    },
    type: "dataStoryNode"
  }

  const connection = guessConnection(existingNodes, node)

  return [node, connection]
}