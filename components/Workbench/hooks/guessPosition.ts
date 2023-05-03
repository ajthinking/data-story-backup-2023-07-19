import { NodeDescription } from "../../../server/NodeDescription";
import { DataStoryNode } from "../../Node/DataStoryNode";

export const guessPosition = (existingNodes: DataStoryNode[], nodeDescription: NodeDescription) => {
  // Defines starting position for new nodes
  const startX = 75;
  const startY = 50;
  // Spacing between nodes
  const spaceX = 200;
  const spaceY = 200;

  // Get the max X and Y positions of existing nodes
  const maxX = existingNodes.map((node) => node.position.x).reduce((max, x) => Math.max(max, x), 0)
  const maxY = existingNodes.map((node) => node.position.y).reduce((max, y) => Math.max(max, y), 0)

  const isStarterNode = nodeDescription.inputs.length === 0;

  if(isStarterNode) {
    return { x: startX, y: maxY === 0 ? startY : maxY + spaceY }
  }

  const mostRecentNode = existingNodes.at(-1)
  const baseX = mostRecentNode?.position.x ?? maxX

  return { x: baseX + spaceX, y: mostRecentNode?.position.y ?? startY + spaceY  }
}