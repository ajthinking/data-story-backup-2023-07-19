import { LinkId } from "./Link";

export class ExecutionUpdate {
  type = "ExecutionUpdate"
  counts: Record<string, number>
  hooks: any[];

  constructor(
    linkCounts: Map<LinkId, number>,
    hooks: any[]
  ) {
    this.counts = Array.from(linkCounts.entries())
    .reduce((acc: Record<string, number>, [linkId, count]) => {
      acc[linkId] = count
      return acc;
    }, {} as Record<string, number>)
    
    this.hooks = hooks
  }
}