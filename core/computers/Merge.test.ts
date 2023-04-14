import { RunArgs } from "../Computer";
import { when } from "../support/computerTester/ComputerTester";
import { Merge } from "./Merge";

it('merges objects when selected properties match', async () => {
  await when(Merge)
    .hasParams({
      requestor_merge_property: 'id',
      supplier_merge_property: 'id',
    })
    .getsInputs({
      requestors: [{ id: 1 }, { id: 2 }],
      suppliers: [{ id: 1, v: 100 }],
    })
    .doRun()
    .expectOutputs({
      merged: [{ id: 1, v: 100 }],
      not_merged: [{ id: 2 }],
    })
    .ok()
})
