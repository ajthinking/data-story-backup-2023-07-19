import { shallow } from "zustand/shallow";
import { Modal } from "../modal"
import { useStore } from '../store';

export const NodeModal = () => {
  const selector = (state: any) => ({
      nodes: state.nodes,
      openNodeModalId: state.openNodeModalId,
      setOpenNodeModalId: state.setOpenNodeModalId,
  });

  const { nodes, openNodeModalId, setOpenNodeModalId } = useStore(selector, shallow);

  const node = nodes.find((node: any) => node.id === openNodeModalId)

  const nonDefaultParams = node.data.params.filter((param: any) => {
    return param.name !== 'name' && param.name !== 'label'
  })

  return (<Modal
    title={node.data.computer}
    setShowModal={(_: any) => setOpenNodeModalId(null)}
  >
    {nonDefaultParams.map((param: any) => {
      return (<div
        className="flex flex-col"
        key={param.name}
      >
        <label className="mt-2 mb-1 text-xs text-gray-400">{param.name}</label>
        {param.type === 'string' && <input type="text" placeholder="The Pen Awakens" className="w-full text-xs px-2 py-1 border rounded border-blue-200"></input>}
        {param.type === 'number' && <input type="number" placeholder="The Pen Awakens" className="w-full text-xs px-2 py-1 border rounded border-blue-200"></input>}
        {param.type === 'json' && <textarea placeholder="[{}]" className="w-full h-48 text-xs px-2 py-1 border rounded border-blue-200"></textarea>}
        {param.type === 'select' && <select className="w-full text-xs px-2 py-1 border rounded border-blue-200">
          {param.selectOptions.map((option: any) => {
            return (<option key={option} value={option}>{option}</option>)
          })} 
        </select>}
      </div>)
    })}
  </Modal>)
}