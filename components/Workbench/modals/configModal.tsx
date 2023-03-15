import { Modal } from "../modal"

export const ConfigModal = ({ setShowModal, server }: any) => {
  return (<Modal
    title={"Config 🔧"}
    content={"Modal content baby!"}
    setShowModal={setShowModal}
  />)
}