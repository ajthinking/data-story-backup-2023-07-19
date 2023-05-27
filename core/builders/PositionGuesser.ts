import { Node } from "../types/Node";

export class PositionGuesser {
  constructor(
    public existingNodes: Node[],
  ) {}

  guess(node: Node): {x: number, y: number} {
    return {
      x: 0,
      y: 0,
    }
  }
}