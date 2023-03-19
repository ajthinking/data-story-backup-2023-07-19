import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import CustomHandle from './CustomHandle';

const Transformer = ({ data, isConnectable }: any) => {
  return (
    (
      <div
        className="text-xs"
      >
        <div className="w-32" />
        <div className="flex py-1 text-xs font-bold font-mono uppercase border rounded bg-blue-500 text-white px-2">
          { data.label }
        </div>
        <div className="flex flex-col mx-2">
          {data.inputs.map((input: any, i: number) => (<div
            className="flex pl-3 border rounded px-2 py-1 bg-gray-50"
            key={input.id}
          >
            <CustomHandle id={input.id} isConnectable={true} isInput={true} />           
            <div className="w-full">input</div>
          </div>))}
        
          {data.outputs.map((output: any, i: number) => (<div
            className="flex pl-3 border rounded px-2 py-1 bg-gray-50"
            key={output.id}
          >
            <div className="w-full">output</div>
            <CustomHandle id={output.id} isConnectable={true} isInput={false} />           
          </div>))}
        </div>     
      </div>
    )
  );
};

export default memo(Transformer)