import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

export const Editor = () => {
  const extremelyLongJson = Array.from({ length: 100000 }).reduce((acc: any, _, i) => {
    acc.push({
      v: Math.random() * i
    })
    return acc;
  }, [] as any);

  return (
    <CodeMirror
      value={JSON.stringify(extremelyLongJson, null, 2)}
      height="800px"
      extensions={[json()]}
      theme={vscodeDark}
      basicSetup={{ lineNumbers: false}}
      editable={false}
    />
  );
}