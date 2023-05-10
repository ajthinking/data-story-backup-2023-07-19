import { Computer } from "./Computer"

export interface SparseComputer extends Partial<Computer> {
  output: any
}
export type SparseComputerFactory = (options?: any) => SparseComputer