import { DataStoryControls } from './dataStoryControls';
import { Modal } from './modal';
import { useCallback, useEffect, useState } from "react";
import ReactFlow, { Background, useNodesState, useEdgesState, addEdge, BackgroundVariant } from "reactflow";

import "reactflow/dist/style.css";
import Transformer from "../Node/Transformer";
import { useDataStoryServer } from "./hooks/useDataStoryServer";
import { ConfigModal } from './modals/configModal'
import { RunModal } from './modals/runModal';
import { AddNodeModal } from './modals/addNodeModal';
import { useStore } from './store';
import { shallow } from 'zustand/shallow'

const nodeTypes = {
  transformer: Transformer,
};

export default function Workbench() {
  const [rfInstance, setRfInstance] = useState<any>(null);
  const [availableNodes, setAvailableNodes] = useState<any>([]);

  const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
  });

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);  

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showRunModal, setShowRunModal] = useState(false);
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);

  const [server, setServer] = useDataStoryServer(null, setAvailableNodes);

  return (
    <>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}
    >     
      <DataStoryControls
        server={server}
        setShowRunModal={setShowRunModal}
        setShowAddNodeModal={setShowAddNodeModal}
        setShowConfigModal={setShowConfigModal}
      />
      <Background variant={BackgroundVariant.Lines} className="bg-white" />
    </ReactFlow>

    {/* Modals */}
    {showRunModal && <RunModal setShowModal={setShowRunModal}/>}    
    {showAddNodeModal && <AddNodeModal availableNodes={availableNodes} setShowModal={setShowAddNodeModal}/>}    
    {showConfigModal && <ConfigModal setShowModal={setShowConfigModal}/>}
    </>
  );
}