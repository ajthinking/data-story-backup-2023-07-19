import { ExecutionUpdate } from "./ExecutionUpdate";
import { LinkId } from "./Link";

export class ExecutionResult {
  type = "executionResult"

  stringify() {    
    return JSON.stringify(this)
  }
}