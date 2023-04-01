import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { ControlButton } from 'reactflow';
import { TableIcon } from './Workbench/icons/tableIcon';
import { DiagramIcon } from './Workbench/icons/diagramIcon';
import { BackIcon } from './Workbench/icons/backIcon';
import { useStore } from './Workbench/store';
import { shallow } from 'zustand/shallow';

export const Editor = ({setMode}: any) => {
  const selector = (state: any) => ({
    dumps: state.dumps,
  });

  const { dumps } = useStore(selector, shallow);

  let mocked = ''

  for (const [key, items] of Object.entries(dumps)) {
    mocked = JSON.stringify(items, null, 2);
    break;
  }

  return (
    <div className="flex w-full bg-vsCodeWarmGray-900">
      <div className="px-4 py-2">
        <li className="mr-2"
            title="Back to Diagram"
            aria-label="Back to Diagram"
            onClick={() => setMode('workbench')}        
        >
            <a href="#" aria-current="page" className="inline-block rounded-t-lg active text-blue-500">
              <BackIcon />
            </a>
            
        </li>        
      </div>
      <div className="w-full px-8 py-4">

      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="mr-2">
            <a href="#" aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Dump x</a>
        </li>
        <li className="mr-2">
            <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Dump y</a>
        </li>
        <li className="mr-2">
            <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Dump z</a>
        </li>
      </ul>

      <div className="w-full pt-4">
        <CodeMirror
              className="w-full"
              value={mocked}
              height="800px"
              extensions={[json()]}
              theme={vscodeDark}
              basicSetup={{ lineNumbers: false}}
              editable={false}
            />
      </div>

      </div>
    </div>);
}