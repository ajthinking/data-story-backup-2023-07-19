export type NextResult = undefined
export type ReturnResult = void | never
export type NextArgument = void
export type PortName = string

import { InputDeviceInterface } from "./InputDeviceInterface"
import { OutputDeviceInterface } from "./OutputDevice"
import { Param } from "./Param"
import { ParamsDevice } from "./ParamsDevice"
import { Storage } from "./Storage"

export type RunArgs = {
  input: InputDeviceInterface,
  output: OutputDeviceInterface,
  params: ParamsDevice,
  storage?: Storage,
}

export interface Computer {
  name: string
  label?: string
  category?: string
  inputs?: PortName[]
  outputs?: PortName[]
  params?: Record<string, Param>
  tags?: string[]

  run: (args: RunArgs) => AsyncGenerator<NextResult, ReturnResult, NextArgument>
  canRun?: (options: {
    isAvailable: () => boolean,
    input: InputDeviceInterface,
  }) => boolean
}

export type ComputerFactory = (options?: any) => Computer