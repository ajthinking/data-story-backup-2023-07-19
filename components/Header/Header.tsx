import React from "react";

export function Header({}) {
  return <div className="flex justify-between items-center px-4 py-2 text-blue-500 bg-gray-800 font-bold font-mono">
    <div className="cursor-pointer select-none">Data Story 2.0</div>
    <div className="space-x-2 select-none ml-4 text-xs tracking-widest text-gray-100">
      <a target={"_blank"} href={"https://github.com/ajthinking/data-story-v2#readme"}>docs</a>
      <span className="">|</span>
      <a target={"_blank"} href={"https://github.com/ajthinking/data-story-v2#readme"}>github</a>
    </div>
  </div>;
}