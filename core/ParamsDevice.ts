import { Param } from "./Param";

type ParamId = string

export type ParamsDevice = {
  [key: ParamId]: Param['value'],
}

const params = (name: string) => {
  // Get the template string
  // Populate the template string with possible data from the item
  // Return the populated template string
}

params('entity')