import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { DefaultParams } from "../../Param";
import { SparseComputer, SparseComputerFactory } from "../../SparseComputer";

export const SparseDemo: SparseComputerFactory = (): SparseComputer => ({
  // output: [{
  //   name: 'all',
  //   schema: {
  //     id: 'string',
  //   }
  // }],

  output: {
    all: {
      id: 'string',
      createdAt: 'string',
      updatedAt: 'string',
      properties: {
        name: 'string',
        label: 'string',
      }
    },
    errors: {},
  },


});
