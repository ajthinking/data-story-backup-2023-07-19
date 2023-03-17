import { Modal } from "../modal"

export const AddNodeModal = ({ setShowModal, availableNodes }: any) => {
  const nodeNames = availableNodes ? availableNodes.map((node: any) => node.name) : [];

  return (<Modal
    title={"Add Node"}
    content={nodeNames.join(", ")}
    setShowModal={setShowModal}
  />)
}