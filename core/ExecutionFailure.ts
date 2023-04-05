export class ExecutionFailure {
  type = "ExecutionFailure"

  constructor(
    public history: string[] = [],
  ) {}

  // TODO I dont like this. It makes the object not so serializeable
  stringify() {    
    return JSON.stringify({
      message: 'Exeuction failed 😩 \nPlease review logs.',
      type: this.type,
      history: this.history,
    })
  }
}