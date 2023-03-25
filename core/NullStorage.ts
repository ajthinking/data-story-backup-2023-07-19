import { Item } from "./Item";
import { Storage } from "./Storage";

export class NullStorage implements Storage {
  async init() {}
  async put(key: string, items: Item[]) {}
}