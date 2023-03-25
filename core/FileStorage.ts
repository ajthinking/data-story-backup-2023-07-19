import { Item } from "./Item";
import { Storage } from "./Storage";
import { promises as fs } from 'fs';

export class FileStorage implements Storage {
  constructor(private root: string) {}

  /**
   * Creates the root directory if it doesn't exist
   */
  async init(): Promise<void> {
    await fs.mkdir(this.root, { recursive: true })
  }

  /**
   * Store items as pretty JSON 
   */
  async put(key: string, items: Item[]): Promise<void> {
    const path = `${this.root}/${key}.json`
    const content = JSON.stringify(items, null, 2)

    await fs.writeFile(path, content)
  }
}