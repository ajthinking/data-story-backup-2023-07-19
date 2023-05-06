import { Node } from "reactflow";
import { Param } from "../../core/Param";

export type DataStoryNodeData = {
  params: Record<string, Param>,
  computer: string,
  label: string,
  inputs: { id: string, name: string }[],
  outputs: { id: string, name: string }[],
  inputSchemas: {
    [key: string]: any,
  }
  outputSchemas: {
    [key: string]: any,
  }
}

export type DataStoryNode = Node<DataStoryNodeData>;