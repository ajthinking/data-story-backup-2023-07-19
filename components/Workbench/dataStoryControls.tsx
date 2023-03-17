import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, BackgroundVariant, Edge, ControlButton, useReactFlow, Panel } from "reactflow";

import React from "react";
import { onClickHelp } from "./hooks/onClickHelp";
export function DataStoryControls({
  server,
  setShowConfigModal,
  setShowRunModal,
  setShowAddNodeModal,
}: any) {
  return <Controls position={'top-left'} showInteractive={false} showZoom={false} showFitView={false}>
        <ControlButton aria-label="run" onClick={() => server.run()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 20 20" strokeWidth={2.0} stroke="currentColor" className="w-6 h-6 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>          
        </ControlButton> 
        <ControlButton aria-label="add node" onClick={() => setShowAddNodeModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="4 4 20 20" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </ControlButton>                
        <ControlButton aria-label="config" onClick={() => setShowConfigModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 22 22" strokeWidth={2.0} stroke="currentColor" className="w-6 h-6 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" />
          </svg>
        </ControlButton>   
        <ControlButton aria-label="help" onClick={onClickHelp}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 22 22" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </ControlButton>                                
      </Controls>;
}
  