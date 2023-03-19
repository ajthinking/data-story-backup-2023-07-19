import { LinkId } from "./Link";

export class ExecutionUpdate {
  constructor(
    public linkCounts: Map<LinkId, number>,
  ) {}

  stringify() {
    return JSON.stringify(this)
  }
}