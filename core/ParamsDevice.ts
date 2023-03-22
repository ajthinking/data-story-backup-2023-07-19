import { Param } from "./Param";

type ParamId = string
type ParamValue = any

export type ParamsDevice = {
  [key: ParamId]: ParamValue,
  __raw: Param[];
}