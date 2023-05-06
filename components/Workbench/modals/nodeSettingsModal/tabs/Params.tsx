import React from "react";
import { DataStoryNode } from "../../../../Node/DataStoryNode";
import { String_ } from "../../../../forms/inputs/string";
import { Json } from "../../../../forms/inputs/json";
import { Number } from "../../../../forms/inputs/number";
import { Text } from "../../../../forms/inputs/text";
import { Select } from "../../../../forms/inputs/select";
export function Params({
  node,
  register
}: {
  node: DataStoryNode,
  register: any
}) {
  const nonDefaultParams = Object.values(node.data.params).filter((param) => {
    return param.name !== 'name' && param.name !== 'label'
  })

  return <div className="max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1">
    {nonDefaultParams.map(param => {
      return <div className="flex flex-col" key={param.name}>
        {param.type === 'string' && <String_ register={register} param={param} />}
        {param.type === 'text' && <Text register={register} param={param} />}
        {param.type === 'number' && <Number register={register} param={param} />}
        {param.type === 'json' && <Json register={register} param={param} />}
        {param.type === 'select' && <Select register={register} param={param} />}
      </div>;
    })}
    {nonDefaultParams.length === 0 && <div className="text-xs text-gray-400">No parameters</div>}
  </div>;
}
  