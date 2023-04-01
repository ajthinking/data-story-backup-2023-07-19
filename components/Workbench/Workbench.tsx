import { DataStoryControls } from './dataStoryControls';
import { useState } from "react";
import ReactFlow, { Background, BackgroundVariant } from "reactflow";
import DataStoryNode from "../Node/DataStoryNode";
import { ConfigModal } from './modals/configModal'
import { RunModal } from './modals/runModal';
import { AddNodeModal } from './modals/addNodeModal';
import { useStore } from './store';
import { shallow } from 'zustand/shallow'
import { NodeModal } from './modals/nodeModal';
import "reactflow/dist/style.css";

const nodeTypes = {
  dataStoryNode: DataStoryNode,
};

export default function Workbench() {
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
      />
      <Background color="#E7E7E7" variant={BackgroundVariant.Lines} />
    </ReactFlow>

    {/* Modals */}
    {showRunModal && <RunModal setShowModal={setShowRunModal}/>}    
    {showAddNodeModal && <AddNodeModal setShowModal={setShowAddNodeModal}/>}    
    {showConfigModal && <ConfigModal setShowModal={setShowConfigModal}/>}
    {openNodeModalId && <NodeModal/>}
    </>
  );
}