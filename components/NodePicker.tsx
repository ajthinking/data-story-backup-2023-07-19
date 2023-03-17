export function NodePicker() {
  return (<div className="flex w-full py-4 max-w-2xl bg-zinc-800">
    <div className="w-32 uppercase tracking-widest text-xs font-bold text-gray-200 bg-zinc-800 border-r border-gray-500">
      <div className="pl-2 mb-4 text-base">Add Node</div>
      <div className="pl-2">inputs</div>
      <div className="pl-2">API</div>
      <div className="pl-2">writing</div>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="border px-4 py-2">
        <div className="text-sm">
          CreateJson
        </div>
      </div>
      <div className="border px-4 py-2">
        <div className="text-sm">
          CreateJson
        </div>
      </div>
      <div className="border px-4 py-2">
        <div className="text-sm">
          CreateJson
        </div>
      </div>
      <div className="border px-4 py-2">
        <div className="text-sm">
          CreateJson
        </div>
      </div>
      <div className="border px-4 py-2">
        <div className="text-sm">
          CreateJson
        </div>
      </div>                  
    </div>    
  </div>)
}