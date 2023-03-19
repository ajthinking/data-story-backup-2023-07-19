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
    const scopedId = (name: string) => {
      const max = nodes
        .filter((node: any) => node.data.computer === name)
        .map((node: any) => node.id)
        .map((id: string) => id.split('.')[1])
        .map((id: string) => parseInt(id))
        .reduce((max: any, id: any) => Math.max(max, id), 0)
  
      return max + 1      
    }

    const counter = scopedId(nodeDescription.name)
    const id = `${nodeDescription.name}.${counter}`;

    const node = {
      id,
      position: { x: Math.random()*800, y: Math.random()*500 },
      data: {
        computer: nodeDescription.name,
        label: nodeDescription.name,
        inputs: nodeDescription.inputs.map((input: any) => {
          return {
            id: `${id}.${input}`,
            name: input
          }
        }),
        outputs: nodeDescription.outputs.map((input: any) => {
          return {
            id: `${id}.${input}`,
            name: input
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