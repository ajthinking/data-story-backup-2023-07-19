import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const CustomHandle = ({ id, isConnectable, isInput }: any) => {
  if(isInput) return (
    <div className="flex items-left justify-start -ml-4">
      <div className="bg-indigo-300 my-0.5 h-3 w-3 rounded-full"/>
      <Handle
        className="relative"
        type="target"
        position={Position.Left}
        style={{ opacity: 0, position: "relative", top: 7, left: -8}}
        id={id}
        isConnectable={isConnectable}
      />                                
    </div>            
  );

  return (
      <div className="flex items-right justify-end -mr-12">
        <div className="bg-indigo-300 my-0.5 h-3 w-3 rounded-full"/>
        <Handle
          className="relative"
          type="source"
          position={Position.Right}
          style={{ opacity: 0, position: "relative", top: 7, right: 8}}
          id={id}
          isConnectable={isConnectable}
        />                                
      </div>            
  );
};

export default memo(CustomHandle)