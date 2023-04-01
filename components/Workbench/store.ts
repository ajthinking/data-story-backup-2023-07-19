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
  ReactFlowInstance,
} from 'reactflow';

type StoreSchema = {
  rfInstance: ReactFlowInstance | undefined;
  availableNodes: NodeDescription[],
  setAvailableNodes: (nodes: NodeDescription[]) => void,
  nodes: Node[];
  edges: Edge[];
  server: null | ServerClient;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onInit: (rfInstance: ReactFlowInstance) => void;
  onRun: () => void;
  onInitServer: () => void;
  updateEdgeCounts: (edgeCounts: Record<string, number>) => void;
  setEdges: (edges: Edge[]) => void;
  openNodeModalId: string | null;
  setOpenNodeModalId: (id: string) => void;
};

import { ServerClient } from "./ServerClient";
import { NodeDescription } from '../../server/commands/describe';

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const useStore = create<StoreSchema>((set, get) => ({
  rfInstance: undefined,
  nodes: [],
  edges: [],
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
  onAddNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    })
  },
  setEdges(edges: Edge[]) {
    set({ edges })
  },
  onInit: (rfInstance: ReactFlowInstance) => {
    set({ rfInstance })
    get().onInitServer()
  },
  onRun: () => {
    get().server!.run(
      get().rfInstance!.toObject()      
    )
  },
  onInitServer: () => {
    console.log("Init server.....")
    const server = new ServerClient(
      new WebSocket("ws://localhost:3100"),
      get().setAvailableNodes,
      get().updateEdgeCounts,
    )

    set({ server })
  },
  server: null,
  availableNodes: [],
  setAvailableNodes: (availableNodes: NodeDescription[]) => {
    set({ availableNodes })
  },
  updateEdgeCounts: (edgeCounts: Record<string, number>) => {
    for(const [id, count] of Object.entries(edgeCounts)) {
      const edge = get().edges.find(edge => edge.id === id)
      if (edge) edge.label = count
    }

    const newEdges = get().edges.map((edge: Edge) => {
      Object.entries(edgeCounts).forEach(([id, count]) => {
        if (edge.id === id) {
          edge.label = count
          edge.labelBgStyle = {
            opacity: 0.6,
          }
        }
      })

      return edge
    })

    get().setEdges(newEdges);
  },
  openNodeModalId: null,
  setOpenNodeModalId: (id: string | null) => {
    set({ openNodeModalId: id })
  },
}));