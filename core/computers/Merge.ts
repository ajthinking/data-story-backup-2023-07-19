import { Computer, ComputerFactory, RunArgs } from "../Computer";
import { ObjectItem } from "../Item";
import { DefaultParams } from "../Param";
import { string } from "../ParamBuilder";

export const Merge: ComputerFactory = (): Computer => ({
  name: 'Merge',
  inputs: ['requestors', 'suppliers'],
  outputs: [
    'merged',
    'not_merged',
  ],
  params: {
    ...DefaultParams,
    requestor_merge_property: string('requestor_merge_property').get(),
    supplier_merge_property: string('supplier_merge_property').get(),
  },

  async *run({ input, output, params }: RunArgs) {
    while(true) {
      // For now assume all items are ready :)
      const requestors = input.pullFrom('requestors') as ObjectItem[]
      const suppliers = input.pullFrom('suppliers') as ObjectItem[]

      for(const requestor of requestors) {
        const requestorKey = params.requestor_merge_property
        const requestorValue: any = requestor[requestorKey] as any

        const supplierKey = params.supplier_merge_property
        const supplierMatch = suppliers.find(supplier => {
          return supplier[supplierKey] === requestorValue
        })
        
        if (supplierMatch) {
          const merged = { ...requestor, ...supplierMatch }
          output.pushTo('merged', [merged])
        } else {
          output.pushTo('not_merged', [requestor])
        }
      }

      yield;
    }
  },
});
