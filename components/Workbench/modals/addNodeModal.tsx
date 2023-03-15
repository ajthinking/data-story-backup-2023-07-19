import { Modal } from "../modal"

export const AddNodeModal = ({ setShowModal }: any) => {
  return (<Modal
    title={"Add Node"}
    content={"Nya noder åt folket!"}
    setShowModal={setShowModal}
  />)
}