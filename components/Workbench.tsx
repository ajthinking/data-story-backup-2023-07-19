import { useCallback, useEffect, useState } from "react";
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, BackgroundVariant, Edge, ControlButton, useReactFlow } from "reactflow";

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
      <Controls showZoom={false} showFitView={false} showInteractive={false}>
      {/* <ControlButton title="run diagram">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
        </ControlButton>        
        <ControlButton onClick={toJson} title="copy JSON">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
        </ControlButton> */}
        <ControlButton title="run diagram">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
          </svg>
        </ControlButton>
        <ControlButton title="run diagram">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
          </svg>
        </ControlButton>                      
      </Controls>
      <Background variant={BackgroundVariant.Lines} className="bg-white" />
    </ReactFlow>
  );
}

export default Workbench;