import { Node } from 'reactflow';
import { Param } from '../../core/Param';
import { PortWithSchema } from '../../core/types/PortWithSchema';

export type DataStoryNodeData = {
  params: Record<string, Param>,
  computer: string,
  label: string,
  inputs: PortWithSchema[],
  outputs: PortWithSchema[],
}

export type DataStoryNode = Node<DataStoryNodeData>;