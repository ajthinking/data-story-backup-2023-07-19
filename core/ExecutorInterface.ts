import { ExecutionUpdate } from "./ExecutionUpdate";

export interface ExecutorInterface {
  execute(): AsyncGenerator<ExecutionUpdate, void, unknown>;
}