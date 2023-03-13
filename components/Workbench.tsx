import { useCallback, useEffect, useState } from "react";
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, BackgroundVariant, Edge, ControlButton, useReactFlow, Panel } from "reactflow";

import "reactflow/dist/style.css";
import { initialEdges } from "./initialEdges";
import { initialNodes } from "./initialNodes";
import Transformer from "./Node/Transformer";

const nodeTypes = {
  transformer: Transformer,
};

function Workbench() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!rfInstance) return;

        const newEdges = edges.map((edge: Edge) => {
          return {
            ...edge,
            label: Number(edge.label) + 50
          };
        });

        setEdges(newEdges);
    }, 100)

    return () => {
      clearInterval(interval);
    }
  })

  const toJson = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();

      
      navigator.clipboard.writeText(JSON.stringify(flow, null, 2))
        .then(() => {
          console.log('Text copied to clipboard');
          alert("Copied diagram as JSON!")
        }).catch(e => {
          console.log('Error', e);
          alert(e)
        })
    }
  };

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}
    >     
      <Controls position={'top-left'} showInteractive={false}>
        <ControlButton onClick={() => console.log('action')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 20 20" strokeWidth={2.0} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>          
        </ControlButton> 
        <ControlButton onClick={() => console.log('action')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 22 22" strokeWidth={2.0} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
          </svg>        
        </ControlButton>                
      </Controls>
      <Background variant={BackgroundVariant.Lines} className="bg-white" />
    </ReactFlow>
  );
}

export default Workbench;