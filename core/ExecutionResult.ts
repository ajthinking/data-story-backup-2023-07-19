import { LinkId } from "./Link";

export class ExecutionResult {
  constructor(
    public linkCounts: Map<LinkId, number>,
  ) {}
}