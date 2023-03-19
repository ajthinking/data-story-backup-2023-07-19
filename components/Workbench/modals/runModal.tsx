import { shallow } from "zustand/shallow";
import { Modal } from "../modal"
import { useStore } from '../store';

export const RunModal = ({ setShowModal }: any) => {
  const selector = (state: any) => ({
    onRun: state.onRun,
  });

  const { onRun } = useStore(selector, shallow);

  return (<Modal
    title={"Run 🔧"}
    setShowModal={setShowModal}
  >
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <div className="font-mono text-xs uppercase">Server</div>
        <div className="bg-green-500 rounded-full h-2 w-2"></div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="font-mono text-xs uppercase">Make space</div>
        <div className="bg-green-500 rounded-full h-2 w-2"></div>
      </div>
      <button
        className="flex items-center space-x-2 my-4"
        onClick={() => {
          onRun()
          setShowModal(false)
        }}
      >
        <div className="w-full font-mono text-xs uppercase px-4 py-1 rounded bg-yellow-400 hover:bg-yellow-500">Run</div>
      </button>
    </div>
  </Modal>)
}