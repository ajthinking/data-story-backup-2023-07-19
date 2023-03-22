import { LinkId } from "./Link";

export class ExecutionUpdate {
  type = "executionUpdate"

  constructor(
    public linkCounts: Map<LinkId, number>,
  ) {}

  stringify() {
    const counts = Array.from(this.linkCounts.entries())
      .reduce((acc: Record<string, number>, [linkId, count]) => {
        acc[linkId] = count
        return acc;
      }, {} as Record<string, number>)
    
    return JSON.stringify({
      type: this.type,
      counts,
    })
  }
}