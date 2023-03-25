export const Select = ({ param, register }: any) => {
  return (<div
    className="flex flex-col"
    key={param.name}
  >
    <label className="mt-2 mb-1 text-xs text-gray-400">{param.name}</label>
    <select
      className="w-full text-xs px-2 py-1 border rounded border-blue-200"
      {...register(param.name)}
    >
      {param.selectOptions.map((option: any) => {
        return (<option key={option} value={option}>{option}</option>)
      })} 
    </select>
  </div>)
}