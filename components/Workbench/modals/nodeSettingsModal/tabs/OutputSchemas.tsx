import React from "react";
import { DataStoryNode } from "../../../../Node/DataStoryNode";
import { Json } from "../../../../forms/inputs/json";

export function OutputSchemas({
  node,
  register
}: {
  node: DataStoryNode,
  register: any
}) {

  return <div className="max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1 text-sm font-mono text-gray-800">
    <div className="text-xs text-gray-600 py-2">
      Use this to define the expected output schema for this node. Note, typically this is auto populated by decendant node schemas. The schema will be used to give you hints on which params that are available for interpolation.
    </div>
    
    <div
    className="flex flex-col"
    >
      <label className="mt-2 mb-1 text-xs text-gray-400">Output Schema</label>
      <textarea
        placeholder={`{ "someProperty": "string"}`}
        className="w-full h-48 text-xs px-2 py-1 border rounded border-blue-200"
        defaultValue={JSON.stringify(node.data.outputSchemas, null, 2)}
      ></textarea>
    </div>
  </div>;
}
  