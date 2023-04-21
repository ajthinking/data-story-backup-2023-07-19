import { DataStoryControls } from './dataStoryControls';
import { useEffect, useState } from "react";
import ReactFlow, { Background, BackgroundVariant } from "reactflow";
import DataStoryNodeComponent from "../Node/DataStoryNodeComponent";
import { ConfigModal } from './modals/configModal'
import { RunModal } from './modals/runModal';
import { AddNodeModal } from './modals/addNodeModal';
import { StoreSchema, useStore } from './store';
import { shallow } from 'zustand/shallow'
import { NodeModal } from './modals/nodeModal';
import "reactflow/dist/style.css";
import { NodeSettingsModal } from './modals/nodeSettingsModal';
import DataStoryCommentNodeComponent from '../Node/DataStoryCommentNodeComponent';

const nodeTypes = {
  dataStoryNodeComponent: DataStoryNodeComponent,
  dataStoryCommentNodeComponent: DataStoryCommentNodeComponent,
};

export default function Workbench() {
  const selector = (state: StoreSchema) => ({
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

  // MOVE OUT
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      // Swedish Mac keyboard 🤷‍♂️
      const shiftR = event.shiftKey && event.code === "KeyR";
      const shiftPlus = event.shiftKey && event.code === "Minus"
      
      // Ensure no modal is already open
      if ([
        openNodeModalId,
        showConfigModal,
        showRunModal,
        showAddNodeModal,
      ].find(Boolean)) return;

      // Open modal!
      if (shiftR) setShowRunModal(true);
      if (shiftPlus) setShowAddNodeModal(true);
    }

    // Add the event listener when the component mounts
    window.addEventListener("keyup", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [openNodeModalId, showConfigModal, showRunModal, showAddNodeModal]);
  
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
        minZoom={0.25}
        maxZoom={8}
      >     
        <DataStoryControls
          setShowRunModal={setShowRunModal}
          setShowAddNodeModal={setShowAddNodeModal}
          // setShowConfigModal={setShowConfigModal}
        />
        <Background color="#E7E7E7" variant={BackgroundVariant.Lines} />
      </ReactFlow>

      {/* Modals */}
      {showRunModal && <RunModal setShowModal={setShowRunModal}/>}    
      {showAddNodeModal && <AddNodeModal setShowModal={setShowAddNodeModal}/>}    
      {showConfigModal && <ConfigModal setShowModal={setShowConfigModal}/>}
      {openNodeModalId && <NodeSettingsModal/>}
    </>
  );
}