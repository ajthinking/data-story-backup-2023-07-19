import { DataStory } from '../components/DataStory';

export default function Home() {
  return (
    <div className="flex flex-col justify-between m-12 bg-gray-100 font-mono text-xs max-w-md">
      <div className="flex p-4">
        {/* Columns */}
        <div className="w-full">
          <div className="border border-gray-200 pl-1">left</div>
          <div className="border border-gray-200 pl-1">row</div>
          <div className="border border-gray-200 pl-1">row</div>
        </div>
        <div className="w-full">
          <div className="border border-gray-200 pl-1">operator</div>
          <div className="border border-gray-200 pl-1">+</div>
          <div className="border border-gray-200 pl-1">AND</div>
        </div>
        <div className="w-full">
          <div className="border border-gray-200 pl-1">right</div>
          <div className="border border-gray-200 pl-1">row</div>
          <div className="border border-gray-200 pl-1">row</div>
        </div>                
      </div>
      <div className="flex p-4 space-x-2 ">
        <div className="cursor-pointer">+</div>
        <div className="cursor-pointer">-</div>
        <div className="cursor-pointer">up</div>
        <div className="cursor-pointer">down</div>
      </div>
    </div>
  )
}
  