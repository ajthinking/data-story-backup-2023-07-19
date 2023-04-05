import { LinkId } from "./Link";

export class ExecutionUpdate {
  type = "ExecutionUpdate"

  constructor(
    public linkCounts: Map<LinkId, number>,
  ) {}

  // TODO I dont like this. It makes the object not so serializeable
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