import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, BackgroundVariant, Edge, ControlButton, useReactFlow, Panel } from "reactflow";

import React from "react";
import { onClickHelp } from "./hooks/onClickHelp";
import { RunIcon } from "./icons/runIcon";
import { AddNodeIcon } from "./icons/addNodeIcon";
import { ConfigIcon } from "./icons/configIcon";
import { HelpIcon } from "./icons/helpIcon";
import { TableIcon } from "./icons/tableIcon";
export function DataStoryControls({
  setShowConfigModal,
  setShowRunModal,
  setShowAddNodeModal,
}: any) {
  return <Controls position={'top-left'} showInteractive={false} showZoom={false} showFitView={false}>
        <ControlButton
          title="Run"
          aria-label="Run"        
          onClick={() => setShowRunModal(true)}
        >
          <RunIcon />
        </ControlButton> 
        <ControlButton
          onClick={() => setShowAddNodeModal(true)}
          title="Add Node"
          aria-label="Add Node"
        >
          <AddNodeIcon />
        </ControlButton>                
        <ControlButton
          onClick={() => setShowConfigModal(true)}
          title="Config"
          aria-label="Config"
        >
          <ConfigIcon />
        </ControlButton>
        <ControlButton
            title="Table"
            aria-label="Table"
          >
          <TableIcon />          
        </ControlButton>                             
      </Controls>;
}
  