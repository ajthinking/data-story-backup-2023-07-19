import { Item } from "../Item"

export type RunArgs = {
  input: {
    pull: () => Item[]
  },
  output: {
    push: (items: Item[]) => void
  }
}