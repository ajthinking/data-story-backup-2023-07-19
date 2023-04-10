import { ExecutionUpdate } from "./ExecutionUpdate";
import { ItemValue } from "./ItemValue";
import { LinkId } from "./Link";

export class ExecutionResult {
  type = "ExecutionResult"

  constructor(
    public id: string,
  ) {}

  stringify() {    
    return JSON.stringify(this)
  }
}