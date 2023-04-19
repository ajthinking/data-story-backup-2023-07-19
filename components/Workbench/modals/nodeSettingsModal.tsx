import { shallow } from "zustand/shallow";
import { Json } from "../../forms/inputs/json";
import { Number } from "../../forms/inputs/number";
import { Select } from "../../forms/inputs/select";
import { String_ } from "../../forms/inputs/string";
import { StoreSchema, useStore } from '../store';
import { useForm } from "react-hook-form";
import { Param, ParamValue } from "../../../core/Param";
import { DataStoryNode } from "../../Node/DataStoryNode";
import { useEscapeKey } from "../hooks/useEscapeKey";

export const NodeSettingsModal = () => {
  const selector = (state: StoreSchema) => ({
    nodes: state.nodes,
    openNodeModalId: state.openNodeModalId,
    setOpenNodeModalId: state.setOpenNodeModalId,
    refreshNodes: state.refreshNodes,
  });  

  const { nodes, openNodeModalId, setOpenNodeModalId } = useStore(selector, shallow);

  const node = nodes.find((node: DataStoryNode) => node.id === openNodeModalId)!

  const defaultParamValues = Object.values(node.data.params).reduce((acc: Record<string, ParamValue>, param: Param) => {
    acc[param.name] = param.value
    return acc
  }, {})

  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...defaultParamValues,
      ...{ label: node.data.label} as Record<string, any>
    }
  });

  const nonDefaultParams = Object.values(node.data.params).filter((param) => {
    return param.name !== 'name' && param.name !== 'label'
  })

  const close = () => setOpenNodeModalId(null);

  const saveAndClose = () => {
    handleSubmit((submitted) => {
      for (const [key, value] of Object.entries(submitted)) {
        node.data.params[key].value = value
      }      

      node.data.label = submitted.label
    })()
    
    close()
  }

  useEscapeKey(close);

  return <>
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <form
              className="relative w-full max-w-4xl my-8 mx-auto px-8"
              onSubmit={handleSubmit(() => alert("submitting!"))}
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between px-8 py-2 border-solid border-slate-200 rounded-t">
                  <input
                    {...register('label')}
                    className="pr-4 mt-4 flex flex-col align-center justify-middleitems-center justify-center text-lg text-gray-400 font-bold tracking widest"
                  />
                  <div className="cursor-pointer p-1 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={close}>
                    <span className="text-gray-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </div>
                </div>
                <div className="mx-8 flex space-x-8 text-xxs uppercase text-gray-400">
                  
                  <div className="pb-2 hover:text-gray-500 cursor-pointer border-b-2 border-blue-400">params</div>
                  <div title="coming soon" className="pb-2 hover:text-gray-500 cursor-pointer">input schema</div>
                  <div title="coming soon" className="pb-2 hover:text-gray-500 cursor-pointer">output schema</div>
                  <div title="coming soon" className="pb-2 hover:text-gray-500 cursor-pointer">config</div>
                </div>
                <div className="max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1">
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
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={close}>
                    Close
                  </button>
                  {<button className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={saveAndClose}>
                    Save
                  </button>}
                </div>
                <div className="h-12"></div>
              </div>
            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>;
}