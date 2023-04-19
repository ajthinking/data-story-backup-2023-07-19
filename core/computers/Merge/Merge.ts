import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { ObjectItemValue } from "../../ItemValue";
import { DefaultParams } from "../../Param";
import { string } from "../../ParamBuilder";

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

  // What should options be?
  // Memory, node and diagram? // Bloated
  // The execution // Simple, but discusting
  // Exactly the same as *run? // Strange
  // InputDeviceReader? // Perhaps.
  // Situations we need to support:
  //  - All items at port
  //  - {Count} items at port
  // async canRun(options: any) {}
  // CanRunDeivice ? Might be.

  async *run({ input, output, params }: RunArgs) {
    while(true) {
      // For now use default heuristics which awaits all ports to be complete

      // No interpolation - extract underlying item form ItemWithParams
      const requestors = input.pullFrom('requestors').map(i => i.value) as ObjectItemValue[]
      const suppliers = input.pullFrom('suppliers').map(i => i.value) as ObjectItemValue[]

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
