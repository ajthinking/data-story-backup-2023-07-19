import { Modal } from "../modal"

export const ConfigModal = ({ setShowModal }: {
  setShowModal: (show: boolean) => void
}) => {
  return (<Modal
    title={"Config"}
    setShowModal={setShowModal}
  />)
}