export class ExecutionResult {
  type = "ExecutionResult"

  constructor(
    public id: string,
  ) {}

  stringify() {    
    return JSON.stringify(this)
  }
}