import { ItemValue } from "./ItemValue";
import { Storage } from "./Storage";

export class NullStorage implements Storage {
  currentExecutionId = '1'
  
  async init() {}
  async createExecution() {}
  async putExecutionItems(key: string, items: ItemValue[]) {}
}