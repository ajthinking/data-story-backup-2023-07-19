import { shallow } from "zustand/shallow";
import { Json } from "../../forms/inputs/json";
import { Number } from "../../forms/inputs/number";
import { Select } from "../../forms/inputs/select";
import { String_ } from "../../forms/inputs/string";
import { Modal } from "../modal"
import { useStore } from '../store';
import { useForm } from "react-hook-form";
import { useState } from "react";

export const NodeModal = () => {
  const selector = (state: any) => ({
    nodes: state.nodes,
    openNodeModalId: state.openNodeModalId,
    setOpenNodeModalId: state.setOpenNodeModalId,
  });

  const { nodes, openNodeModalId, setOpenNodeModalId } = useStore(selector, shallow);

  const node = nodes.find((node: any) => node.id === openNodeModalId)

  const { register, handleSubmit } = useForm({
    defaultValues: Object.values(node.data.params).reduce((acc: any, param: any) => {
      acc[param.name] = param.value
      return acc
    }, {}) as any
  });

  const [data, setData] = useState("");



  const nonDefaultParams = Object.values(node.data.params).filter((param: any) => {
    return param.name !== 'name' && param.name !== 'label'
  })

  const saveAndClose = () => {
    handleSubmit((data) => {
      for (const [key, value] of Object.entries(data)) {
        node.data.params[key].value = value
      }
    })()
    
    setOpenNodeModalId(undefined)
  }

  return (<Modal
    title={node.data.computer}
    setShowModal={(_: any) => setOpenNodeModalId(null)}
    primaryAction={"Save"}
    onPrimaryAction={saveAndClose}  
  >
    <form onSubmit={handleSubmit(() => alert("submitting!"))}>
      {nonDefaultParams.map((param: any) => {
        return (<div
          className="flex flex-col"
          key={param.name}
        >
          {param.type === 'string' && <String_ register={register} param={param} />}
          {param.type === 'number' && <Number register={register} param={param} />}
          {param.type === 'json' && <Json register={register} param={param} />}
          {param.type === 'select' && <Select register={register} param={param} />}
        </div>)
      })}
      {nonDefaultParams.length === 0 && <div className="text-xs text-gray-400">No parameters</div>}
    </form>
  </Modal>)
}