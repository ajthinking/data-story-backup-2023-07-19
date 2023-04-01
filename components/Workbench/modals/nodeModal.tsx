import { shallow } from "zustand/shallow";
import { Json } from "../../forms/inputs/json";
import { Number } from "../../forms/inputs/number";
import { Select } from "../../forms/inputs/select";
import { String_ } from "../../forms/inputs/string";
import { Modal } from "../modal"
import { StoreSchema, useStore } from '../store';
import { useForm } from "react-hook-form";
import { Param, ParamValue } from "../../../core/Param";
import { DataStoryNode } from "../../Node/DataStoryNode";

export const NodeModal = () => {
  const selector = (state: StoreSchema) => ({
    nodes: state.nodes,
    openNodeModalId: state.openNodeModalId,
    setOpenNodeModalId: state.setOpenNodeModalId,
  });

  const { nodes, openNodeModalId, setOpenNodeModalId } = useStore(selector, shallow);

  const node = nodes.find((node: DataStoryNode) => node.id === openNodeModalId)!

  const { register, handleSubmit } = useForm({
    defaultValues: Object.values(node.data.params).reduce((acc: Record<string, ParamValue>, param: Param) => {
      acc[param.name] = param.value
      return acc
    }, {})
  });

  const nonDefaultParams = Object.values(node.data.params).filter((param) => {
    return param.name !== 'name' && param.name !== 'label'
  })

  const saveAndClose = () => {
    handleSubmit((data) => {
      for (const [key, value] of Object.entries(data)) {
        node.data.params[key].value = value
      }
    })()
    
    setOpenNodeModalId(null)
  }

  return (<Modal
    title={node.data.computer}
    // What is this line??
    setShowModal={(open: boolean) => setOpenNodeModalId(null)}
    primaryAction={"Save"}
    onPrimaryAction={saveAndClose}  
  >
    <form onSubmit={handleSubmit(() => alert("submitting!"))}>
      {nonDefaultParams.map(param => {
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