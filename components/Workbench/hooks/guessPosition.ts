import { Node } from "reactflow";
import { NodeDescription } from "../../../server/commands/describe";

export const guessPosition = (existingNodes: Node[], nodeDescription: NodeDescription) => {
  // Defines starting position for new nodes
  const startX = 75;
  const startY = 50;
  // Spacing between nodes
  const spaceX = 200;
  const spaceY = 100;

  // Get the max X and Y positions of existing nodes
  const maxX = existingNodes.map((node: any) => node.position.x).reduce((max: number, x: number) => Math.max(max, x), 0)
  const maxY = existingNodes.map((node: any) => node.position.y).reduce((max: number, y: number) => Math.max(max, y), 0)

  const isStarterNode = nodeDescription.inputs.length === 0;

  if(isStarterNode) {
    return { x: startX, y: maxY === 0 ? startY : maxY + spaceY }
  }

  const mostRecentNode = existingNodes.at(-1)

  return { x: maxX + spaceX, y: mostRecentNode?.position.y ?? startY + spaceY  }
}