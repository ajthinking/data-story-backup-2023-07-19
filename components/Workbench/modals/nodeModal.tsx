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

  return (<Modal
    title={node.data.computer}
    setShowModal={(_: any) => setOpenNodeModalId(null)}
  >
    {node.data.params.map((param: any) => {
      return (<div
        key={param.name}
      >
        <input placeholder="The Pen Awakens" className="w-full text-xs px-2 py-1 border rounded border-blue-200"></input>
      </div>)
    })}
  </Modal>)
}