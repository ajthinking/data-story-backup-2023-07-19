import { useState } from 'react';
import { DataStory } from '../components/DataStory';

export default function Home() {
  const [format, setFormat] = useState('string')
  const [i, setI] = useState('')
  const [inputValue, setInputValue] = useState('')

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
      <div className="mt-8">
        <div className="flex w-full bg-gray-200">
          <input
            className="p-1 bg-gray-200 w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="text-xs px-2 text-gray-600 bg-gray-200 hover:border-gray-400 focus:outline-none appearance-none text-xxs">
              <option>str </option>
              <option>number</option>
              <option>JSON</option>
          </select>           
          <select
              value={i}
              onChange={(e) => {
                setInputValue(inputValue + '${' + e.target.value + '}')
                setI('')
              }}
              className="text-xs w-6 text-yellow-400 bg-yellow-400 hover:border-gray-400 focus:outline-none appearance-none">
              <option></option>
              <option>a</option>
              <option>b</option>
          </select>            
        </div>
      </div>
    </div>
  )
}
  