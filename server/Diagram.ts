import { Link } from "./computers/Link"
import { Node } from "./computers/Node"

export class Diagram {
  constructor(
    public nodes: any[],
    public edges: any[],
  ) {}

  async *execute() {
    yield 1
    yield 2
    yield 3

    return 100
  }
}