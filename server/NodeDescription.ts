import { Param } from "../core/Param";

export type NodeDescription = {
  name: string,
  label?: string,
  category?: string,
  inputs: string[],
  outputs: string[],
  params: Record<string, Param>,
  tags: string[],
}