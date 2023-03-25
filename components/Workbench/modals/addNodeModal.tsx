import { shallow } from "zustand/shallow";
import { NodeDescription } from "../../../server/commands/describe";
import { Modal } from "../modal"
import { useStore } from '../store';

export const AddNodeModal = ({ setShowModal }: any) => {
  const selector = (state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      onAddNode: state.onAddNode,
      availableNodes: state.availableNodes,
  });

  const { nodes, onAddNode, availableNodes } = useStore(selector, shallow);

  const doAddNode = (nodeDescription: NodeDescription) => {
    const scopedId = (name: string) => {
      const max = nodes
        .filter((node: any) => node.data.computer === name)
        .map((node: any) => node.id)
        .map((id: string) => id.split('.')[1])
        .map((id: string) => parseInt(id))
        .reduce((max: number, id: number) => Math.max(max, id), 0)
  
      return max + 1      
    }

    const counter = scopedId(nodeDescription.name)
    const id = `${nodeDescription.name}.${counter}`;

    const node = {
      id,
      position: { x: Math.random()*800, y: Math.random()*500 },
      data: {
        params: nodeDescription.params,
        computer: nodeDescription.name,
        label: nodeDescription.name,
        inputs: nodeDescription.inputs.map((input: string) => {
          return {
            id: `${id}.${input}`,
            name: input
          }
        }),
        outputs: nodeDescription.outputs.map((input: string) => {
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
    <div className="grid grid-cols-3 gap-2">
      {availableNodes.map((nodeDescription: NodeDescription) => {
        return (<div
          className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-gray-600 flex items-center px-4 py-2 border border-gray-300 text-xs shadow"
          key={nodeDescription.name}
          onClick={() => doAddNode(nodeDescription)}
          >
          {nodeDescription.name}
        </div>)
      })}                                                
    </div>
  </Modal>)
}