import { shallow } from "zustand/shallow";
import { NodeDescription } from "../../../server/commands/describe";
import { Modal } from "../modal"
import { useStore } from '../store';

export const AddNodeModal = ({ setShowModal }: any) => {
  const selector = (state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
      onAddNode: state.onAddNode,
      onConnect: state.onConnect,
      availableNodes: state.availableNodes,
  });

  const { nodes, onAddNode, onConnect, availableNodes } = useStore(selector, shallow);

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

    const maxX = nodes.map((node: any) => node.position.x).reduce((max: number, x: number) => Math.max(max, x), -100)

    const counter = scopedId(nodeDescription.name)
    const id = `${nodeDescription.name}.${counter}`;

    const node = {
      id,
      position: { x: maxX + 200, y: 50 },
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

    const getConnection = () => {
      const previousNode = nodes.at(-1)
      if(!previousNode) return null;

      console.log("Previous existed!")

      const firstOutput = previousNode.data.outputs[0]
      if(!firstOutput) return null;

      console.log("Previous had output!")

      const firstInput = node.data.inputs[0]
      if(!firstInput) return null;

      console.log("Node had output, returning!")

      return {
        id: `${previousNode.id}.${firstOutput.name}-->${node.id}.${firstInput.name}`,
        sourceHandle: firstOutput.id,
        targetHandle: firstInput.id,
        source: previousNode.id,
        target: node.id,
      }
    }

    const connection = getConnection()

    onAddNode(node)
    if(connection) onConnect(connection);

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