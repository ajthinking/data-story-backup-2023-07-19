import { Item } from "./Item";
import { Param } from "./Param";

type ParamId = string

export type ParamsDevice = {
  [key: ParamId]: Param['value'],
}

// const params = (name: string, item: Item) => {
//   // Get the template string
//   const template
//   // Populate the template string with possible data from the item
//   // Return the populated template string
// }

// params('entity')


// // Easy usage for static params
// const params = {}

// const item = {
//   value: {
//     name: 'Bob',
//     age: 30,
//   },
//   params: {
//     entity: 'person',
//   }
// }