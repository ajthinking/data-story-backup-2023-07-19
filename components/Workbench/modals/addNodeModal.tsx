import { shallow } from "zustand/shallow";
import { Modal } from "../modal"
import { useStore } from '../store';

export const AddNodeModal = ({ setShowModal, availableNodes }: any) => {
  const nodeNames = availableNodes ? availableNodes.map((node: any) => node.name) : [];

  const selector = (state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      onAddNode: state.onAddNode,
  });

  const { nodes, edges, onAddNode } = useStore(selector, shallow);

  const doAddNode = (name: string) => {
    const id = name + Math.random();

    const node = {
      id,
      position: { x: Math.random()*500, y: Math.random()*500 },
      data: {
        computer: 'Scalar',
        label: "HubSpot Contacts",
        inputs: [],
        outputs: [
          {
            id: `${id}-output`,
            name: "output"
          },
        ],
      },
      type: "transformer"
    }

    onAddNode(node)
  }

  return (<Modal
    title={"Add Node"}
    setShowModal={setShowModal}
  >
    {nodeNames.map((name: any) => {
      return (<div
        className="cursor-pointer hover:bg-gray-50 text-gray-600 flex items-center justify-center w-full px-4 py-1 border border-gray-300 text-xs"
        key={name}
        onClick={() => doAddNode(name)}
        >
        {name}
      </div>)
    })}
  </Modal>)
}