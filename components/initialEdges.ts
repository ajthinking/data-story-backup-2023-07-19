import { Edge } from "reactflow";

// export const initialEdges: Edge<any>[] = []; //[{ id: 'e1-2', source: '1', target: '2' }];

export const initialEdges: Edge<any>[] = [
  {
    id: 'Scalar.1.output<--->Multiply.1.input',
    source: 'Scalar.1',
    target: 'Multiply.1',
    sourceHandle: 'Scalar.1.output',
    targetHandle: 'Multiply.1.input',
    label: '132',
  },
  {
    id: 'Multiply.1.output<--->Log.1.input',
    source: 'Multiply.1',
    target: 'Log.1',
    sourceHandle: 'Multiply.1.output',
    targetHandle: 'Log.1.input',
    label: '14',
  },
];

