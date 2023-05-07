import { Param } from "../../../core/Param"
import { UseFormRegister } from "react-hook-form";

export const Text = ({ register, label, id }: {
  register: UseFormRegister<Record<string, any>>
  label: string,
  id: string      
}) => {
  return (<div
    className="flex flex-col"
    key={id}
  >
    <label className="mt-2 mb-1 text-xs text-gray-400">{label}</label>
    <textarea
      className="w-full h-48 text-xs px-2 py-1 border rounded border-blue-200"
      {...register(id)}
    ></textarea>
  </div>)
}