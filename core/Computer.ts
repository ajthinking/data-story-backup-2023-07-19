type NextResult = undefined
type ReturnResult = void | never
type NextArgument = void

import { InputDeviceInterface } from "./InputDevice"
import { Item } from "./Item"
import { OutputDeviceInterface } from "./OutputDevice"
import { Param } from "./Param"

export type RunArgs = {
  input: InputDeviceInterface,
  output: OutputDeviceInterface,
  params: Record<string, Param>
}

export interface Computer {
  name: string
  inputs?: string[]
  outputs?: string[]
  params?: Param[]

  run: (args: RunArgs) => AsyncGenerator<NextResult, ReturnResult, NextArgument>
  canRun?: (options: any) => boolean
}