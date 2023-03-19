import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, BackgroundVariant, Edge, ControlButton, useReactFlow, Panel } from "reactflow";

import React from "react";
import { onClickHelp } from "./hooks/onClickHelp";
import { RunIcon } from "./icons/runIcon";
import { AddNodeIcon } from "./icons/addNodeIcon";
import { ConfigIcon } from "./icons/configIcon";
import { HelpIcon } from "./icons/helpIcon";
export function DataStoryControls({
  server,
  setShowConfigModal,
  setShowRunModal,
  setShowAddNodeModal,
}: any) {
  return <Controls position={'top-left'} showInteractive={false} showZoom={false} showFitView={false}>
        <ControlButton onClick={() => setShowRunModal(true)}>
          <RunIcon />          
        </ControlButton> 
        <ControlButton onClick={() => setShowAddNodeModal(true)}>
          <AddNodeIcon />
        </ControlButton>                
        <ControlButton onClick={() => setShowConfigModal(true)}>
          <ConfigIcon />
        </ControlButton>   
        <ControlButton onClick={onClickHelp}>
          <HelpIcon />
        </ControlButton>                                
      </Controls>;
}
  