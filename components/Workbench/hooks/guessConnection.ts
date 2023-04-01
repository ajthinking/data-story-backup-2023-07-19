import { Node } from "reactflow";

export const guessConnection = (existingNodes: Node[], node: Node) => {
  const previousNode = existingNodes.at(-1)
  if(!previousNode) return null;

  const firstOutput = previousNode.data.outputs[0]
  if(!firstOutput) return null;

  const firstInput = node.data.inputs[0]
  if(!firstInput) return null;

  return {
    id: `${previousNode.id}.${firstOutput.name}-->${node.id}.${firstInput.name}`,
    sourceHandle: firstOutput.id,
    targetHandle: firstInput.id,
    source: previousNode.id,
    target: node.id,
  }
}