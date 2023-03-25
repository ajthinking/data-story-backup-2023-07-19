export const Number = ({ param, register }: any) => {
  return (<div
    className="flex flex-col"
    key={param.name}
  >
    <label className="mt-2 mb-1 text-xs text-gray-400">{param.name}</label>
    <input
      type="number"
      className="w-full text-xs px-2 py-1 border rounded border-blue-200"
      {...register(param.name)}
    ></input>
  </div>)
}


