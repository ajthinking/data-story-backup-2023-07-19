import { Item } from "./Item";

export interface Storage {
  currentExecutionId: string | null

  init(): Promise<void>
  createExecution(): Promise<void>
  putExecutionItems(key: string, items: Item[]): Promise<void>
}