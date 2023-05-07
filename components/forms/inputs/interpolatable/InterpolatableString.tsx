import { UseFormRegister, UseFormReturn } from "react-hook-form"
import { Param } from "../../../../core/Param"
import { useState } from "react"

export const InterPolatableString = ({ form, label, id, inputSchemas }: {
  label: string,
  id: string
  form: UseFormReturn<{
    [x: string]: any;
  }>,
  inputSchemas: any
}) => {
  const [i, setI] = useState('')

  console.log({
    inputSchemas
  })

  return (<div
    className="flex flex-col"
    key={id}
  >
    <label className="mt-2 mb-1 text-xs text-gray-400">{label}</label>
    <div className="flex w-full">
      <input
        type="text"
        placeholder=""
        className="w-full text-xs px-2 py-1 border border-blue-200"
        {...form.register(id)}
      >
      </input>
      <select
          value={i}
          onChange={(e) => {
            form.setValue(
              id,
              form.getValues(id) + '${' + e.target.value + '}'
            )
          }}
          className="ml-1 border border-gray-300 text-xs w-6 text-gray-300 bg-gray-300 hover:border-gray-400 focus:outline-none appearance-none">
          <option></option>
          <option>a</option>
          <option>b</option>
      </select> 

    </div>
  </div>)
}