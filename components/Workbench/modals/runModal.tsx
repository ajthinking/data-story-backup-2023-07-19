import { Modal } from "../modal"

export const RunModal = ({ setShowModal }: any) => {
  return (<Modal
    title={"Run 🔧"}
    content={"Were gonna run it!"}
    setShowModal={setShowModal}
  />)
}