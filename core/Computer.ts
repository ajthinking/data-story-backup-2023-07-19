type NextResult = undefined
type ReturnResult = void | never
type NextArgument = void

import { InputDeviceInterface } from "./InputDevice"
import { Item } from "./Item"
import { OutputDeviceInterface } from "./OutputDevice"
import { Param } from "./Param"
import { ParamsDevice } from "./ParamsDevice"

export type RunArgs = {
  input: InputDeviceInterface,
  output: OutputDeviceInterface,
  params: ParamsDevice,
  storage?: any,
}

export interface Computer {
  name: string
  inputs?: string[]
  outputs?: string[]
  params?: Record<string, Param>
  tags?: string[]

  run: (args: RunArgs) => AsyncGenerator<NextResult, ReturnResult, NextArgument>
  canRun?: (options: any) => boolean
}

export type ComputerFactory = (options?: any) => Computer