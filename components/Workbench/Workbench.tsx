import { DataStoryControls } from './dataStoryControls';
import { Modal } from './modal';
import { useCallback, useEffect, useState } from "react";
import ReactFlow, { Background, useNodesState, useEdgesState, addEdge, BackgroundVariant } from "reactflow";
import { usePlusKey } from "./hooks/usePlusKey";

import "reactflow/dist/style.css";
import Transformer from "../Node/Transformer";
import { ConfigModal } from './modals/configModal'
import { RunModal } from './modals/runModal';
import { AddNodeModal } from './modals/addNodeModal';
import { useStore } from './store';
import { shallow } from 'zustand/shallow'
import { NodeModal } from './modals/nodeModal';

const nodeTypes = {
  transformer: Transformer,
};

export default function Workbench({setMode}: any) {
  const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onInit: state.onInit,
    openNodeModalId: state.openNodeModalId,
    setOpenNodeModalId: state.setOpenNodeModalId,
  });

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onInit, openNodeModalId, setOpenNodeModalId } = useStore(selector, shallow);  

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showRunModal, setShowRunModal] = useState(false);
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);

  // usePlusKey(() => setShowAddNodeModal(true));

  return (
    <>
    <ReactFlow
      className="bg-gray-50"
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
        setMode={setMode}
      />
      <Background color="lightGray" variant={BackgroundVariant.Lines} />
    </ReactFlow>

    {/* Modals */}
    {showRunModal && <RunModal setShowModal={setShowRunModal}/>}    
    {showAddNodeModal && <AddNodeModal setShowModal={setShowAddNodeModal}/>}    
    {showConfigModal && <ConfigModal setShowModal={setShowConfigModal}/>}
    {openNodeModalId && <NodeModal/>}
    </>
  );
}