import { Params } from './tabs/Params';
import { shallow } from "zustand/shallow";
import { StoreSchema, useStore } from '../../store';
import { useForm } from "react-hook-form";
import { Param, ParamValue } from "../../../../core/Param";
import { DataStoryNode } from "../../../Node/DataStoryNode";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { useState } from "react";
import { InputSchemas } from './tabs/InputSchemas';
import { OutputSchemas } from './tabs/OutputSchemas';
import { Config } from './tabs/Config';

export const NodeSettingsModal = () => {
  const [tab, setTab] = useState('Params')

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
          <div className="flex justify-center overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <form
              className="relative w-full max-w-4xl my-8 mx-auto px-8"
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
                  <div onClick={() => setTab('Params')} className={`pb-2 hover:text-gray-500 cursor-pointer ${tab === 'Params' && " border-b-2 border-blue-400"}`}>params</div>
                  <div onClick={() => setTab('InputSchemas')} className={`pb-2 hover:text-gray-500 cursor-pointer ${tab === 'InputSchemas' && " border-b-2 border-blue-400"}`}>input schema</div>
                  <div onClick={() => setTab('OutputSchemas')} className={`pb-2 hover:text-gray-500 cursor-pointer ${tab === 'OutputSchemas' && " border-b-2 border-blue-400"}`}>output schema</div>
                  <div onClick={() => setTab('Config')} className={`pb-2 hover:text-gray-500 cursor-pointer ${tab === 'Config' && " border-b-2 border-blue-400"}`}>config</div>
                </div>
                {tab === 'Params' && <Params node={node} register={register} />}
                {tab === 'InputSchemas' && <InputSchemas node={node} register={register} />}
                {tab === 'OutputSchemas' && <OutputSchemas node={node} register={register} />}
                {tab === 'Config' && <Config node={node} register={register} />}
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