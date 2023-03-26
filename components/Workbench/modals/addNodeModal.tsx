import { useState } from "react";
import { shallow } from "zustand/shallow";
import { NodeDescription } from "../../../server/commands/describe";
import { Modal } from "../modal"
import { useStore } from '../store';

export const AddNodeModal = ({ setShowModal }: any) => {
  const [search, setSearch] = useState("");
  const [filteredNodes, setFilteredNodes] = useState(undefined)

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

      const firstOutput = previousNode.data.outputs[0]
      if(!firstOutput) return null;

      const firstInput = node.data.inputs[0]
      if(!firstInput) return null;

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

  const matchingNodes = availableNodes.filter((nodeDescription: NodeDescription) => {
    return JSON.stringify(nodeDescription).toLowerCase().includes(search.toLowerCase())
  })

  return (<Modal
    // title={"Add Node"}
    setShowModal={setShowModal}
  >
    <div>
      <input 
        className="w-full mb-2 text-gray-500 font-mono text-sm border border-gray-100 rounded px-4 py-4" placeholder={"Type format, action, resource ..."}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
    </div>
    <div className="group grid grid-cols-2 gap-2">
      {matchingNodes.map((nodeDescription: NodeDescription) => {
        return (<div
          className="flex justify-between font-bold cursor-pointer bg-slate-100 hover:bg-slate-200 text-gray-400 flex items-center px-4 py-2 border border-gray-300 text-base shadow"
          key={nodeDescription.name}
          onClick={() => doAddNode(nodeDescription)}
          >
            <div className="text-gray-500 text-sm"><span className="text-indigo-500 font-mono">Core::</span>{nodeDescription.name}</div>
            <div className="flex space-x-1">
              {nodeDescription.tags.map((tag: string) => {
                let style = "bg-blue-300 border px-2 rounded tracking-wide text-xxs text-white"
                return (<div key={tag} className={style}>{tag}</div>)
              })}
            </div>

            {/* <button className="hidden group-hover:block">Child</button> */}
        </div>)
      })}                                                
    </div>
  </Modal>)
}