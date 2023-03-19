import { shallow } from "zustand/shallow";
import { Modal } from "../modal"
import { useStore } from '../store';

export const AddNodeModal = ({ setShowModal }: any) => {
  const selector = (state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      onAddNode: state.onAddNode,
      availableNodes: state.availableNodes,
  });

  const { nodes, edges, onAddNode, availableNodes } = useStore(selector, shallow);

  const doAddNode = (nodeDescription: any) => {
    const id = nodeDescription.name + Math.random();

    const node = {
      id,
      position: { x: Math.random()*800, y: Math.random()*500 },
      data: {
        computer: nodeDescription.name,
        label: nodeDescription.name,
        inputs: nodeDescription.inputs.map((input: any) => {
          return {
            id: `${id}-${input.name}`,
            name: input.name
          }
        }),
        outputs: nodeDescription.outputs.map((input: any) => {
          return {
            id: `${id}-${input.name}`,
            name: input.name
          }
        }),
      },
      type: "transformer"
    }

    onAddNode(node)

    setShowModal(false)
  }

  return (<Modal
    title={"Add Node"}
    setShowModal={setShowModal}
  >
    {availableNodes.map((nodeDescription: any) => {
      return (<div
        className="cursor-pointer hover:bg-gray-50 text-gray-600 flex items-center justify-center w-full px-4 py-1 border border-gray-300 text-xs"
        key={nodeDescription.name}
        onClick={() => doAddNode(nodeDescription)}
        >
        {nodeDescription.name}
      </div>)
    })}
  </Modal>)
}