import { Item } from "./Item";

export interface Storage {
  init(): Promise<void>
  put(key: string, items: Item[]): Promise<void>
}