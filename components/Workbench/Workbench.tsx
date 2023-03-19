import { DataStoryControls } from './dataStoryControls';
import { Modal } from './modal';
import { useCallback, useEffect, useState } from "react";
import ReactFlow, { Background, useNodesState, useEdgesState, addEdge, BackgroundVariant } from "reactflow";

import "reactflow/dist/style.css";
import Transformer from "../Node/Transformer";
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

  const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onInit: state.onInit,
  });

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onInit } = useStore(selector, shallow);  

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showRunModal, setShowRunModal] = useState(false);
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);

  return (
    <>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
    >     
      <DataStoryControls
        setShowRunModal={setShowRunModal}
        setShowAddNodeModal={setShowAddNodeModal}
        setShowConfigModal={setShowConfigModal}
      />
      <Background variant={BackgroundVariant.Lines} className="bg-white" />
    </ReactFlow>

    {/* Modals */}
    {showRunModal && <RunModal setShowModal={setShowRunModal}/>}    
    {showAddNodeModal && <AddNodeModal setShowModal={setShowAddNodeModal}/>}    
    {showConfigModal && <ConfigModal setShowModal={setShowConfigModal}/>}
    </>
  );
}