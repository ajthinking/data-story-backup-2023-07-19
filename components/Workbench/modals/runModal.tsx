import { shallow } from "zustand/shallow";
import { Modal } from "../modal"
import { StoreSchema, useStore } from '../store';

export const RunModal = ({ setShowModal }: {
  setShowModal: (show: boolean) => void
}) => {
  const selector = (state: StoreSchema) => ({
    onRun: state.onRun,
  });

  const { onRun } = useStore(selector, shallow);

  return (<Modal
    title={"Run"}
    setShowModal={setShowModal}
  >
    <div className="flex flex-col space-y-2">
      <div className="text-xs mb-4 text-gray-500">Server: <span className="ml-2 font-mono text-gray-600">localhost:3100</span></div>
      <button
        className="flex items-center justify-center space-y-4 space-x-2 my-4"
        onClick={() => {
          onRun()
          setShowModal(false)
        }}
      >
        <div className="font-mono text-xs w-full uppercase px-8 py-1 rounded text-gray-50 bg-blue-500 hover:bg-blue-600">Run</div>
      </button>
    </div>
  </Modal>)
}