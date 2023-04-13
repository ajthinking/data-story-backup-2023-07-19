import { Controls, ControlButton } from "reactflow";

import React from "react";
import { RunIcon } from "./icons/runIcon";
import { AddNodeIcon } from "./icons/addNodeIcon";
import { ConfigIcon } from "./icons/configIcon";
import { SaveIcon } from "./icons/saveIcon";

export function DataStoryControls({
  // setShowConfigModal,
  setShowRunModal,
  setShowAddNodeModal,
}: {
  // setShowConfigModal: (showConfigModal: boolean) => void;
  setShowRunModal: (showRunModal: boolean) => void;
  setShowAddNodeModal: (showAddNodeModal: boolean) => void;
}) {
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
        {/* <ControlButton
          onClick={() => setShowConfigModal(true)}
          title="Config"
          aria-label="Config"
        >
          <ConfigIcon />
        </ControlButton> */}
        {/* <ControlButton
            title="Table"
            aria-label="Table"
            onClick={() => setMode('dump')}
          >
          <TableIcon />          
        </ControlButton>                              */}
      <ControlButton
          onClick={() => {
            alert("HEJ!")
          }}
          title="Add Node"
          aria-label="Add Node"
        >
          <SaveIcon />
        </ControlButton>           
      </Controls>;
}
  