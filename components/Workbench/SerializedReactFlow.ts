import { Param } from '../../core/Param'

export type SerializedReactFlow = {
  nodes: SerializedReactFlowNode[],
  edges: SerializedReactFlowEdge[],
  viewport: {
    x: number,
    y: number,
    zoom: number,
  },
}

export type SerializedReactFlowNode = {
  width?: number | null,
  height?: number | null,
  id: string,
  position: {
    x: number,
    y: number,
  },
  data: {
    computer: string,
    label: string,
    inputs: {
      id: string,
      name: string,
    }[],
    outputs: {
      id: string,
      name: string,
    }[],
    params: Record<string, Param>,
    inputSchemas: Record<string, any>,
    outputSchemas: Record<string, any>,
  },
  selected?: boolean,
  type?: string,
  positionAbsolute?: {
    x: number,
    y: number,
  },
  dragging?: boolean,
}

export type SerializedReactFlowEdge = {
  id: string
  source: string,
  target: string,
  sourceHandle?: string | null,
  targetHandle?: string | null,
}