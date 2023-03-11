type NextResult = undefined
type ReturnResult = void | never
type NextArgument = void

import { Item } from "./Item"

export type RunArgs = {
  input: {
    pull: () => Item[]
  },
  output: {
    push: (items: Item[]) => void
  }
}

export interface Computer {
  run: (args: RunArgs) => AsyncGenerator<NextResult, ReturnResult, NextArgument>
  canRun?: (options: any) => boolean
}