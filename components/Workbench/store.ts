import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import { initialNodes } from '../initialNodes';
import { initialEdges } from '../initialEdges';

type RFState = {
  rfInstance: any;
  availableNodes: any[],
  setAvailableNodes: any,
  nodes: Node[];
  edges: Edge[];
  server: null | ServerClient;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onInit: any;
  onRun: any;
  onInitServer: any;
};

import { ServerClient } from "./ServerClient";

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useStore = create<RFState>((set, get) => ({
  rfInstance: null,
  nodes: [], //initialNodes,
  edges: [], //initialEdges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    const fromHandleId = connection.sourceHandle;
    const toHandleId = connection.targetHandle;

    set({
      edges: addEdge({
        ...connection,
        id: `${fromHandleId}-->${toHandleId}`,
      }, get().edges),
    });
  },
  onAddNode: (node: any) => {
    set({
      nodes: [...get().nodes, node],
    })
  },
  onInit: (rfInstance: any) => {
    set({ rfInstance })
    get().onInitServer()
  },
  onRun: () => {
    get().server!.run(
      get().rfInstance.toObject()      
    )
  },
  onInitServer: () => {
    console.log("Init server.....")
    const server = new ServerClient(
      new WebSocket("ws://localhost:3100"),
      get().setAvailableNodes,
    )

    set({ server })
  },
  server: null,
  availableNodes: [],
  setAvailableNodes: (availableNodes: any[]) => {
    set({ availableNodes })
  },
}));