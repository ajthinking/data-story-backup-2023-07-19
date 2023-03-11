import { Link } from "./computers/Link"
import { Node } from "./computers/Node"

export class Diagram {
  constructor(
    public nodes: any[],
    public edges: any[],
  ) {}
}