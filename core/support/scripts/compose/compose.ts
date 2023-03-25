import fs from 'fs';
import { sourceFileContent } from './sourceFileContent';
import { testFileContent } from './testFileContent';

const NODE_ROOT = 'core/computers';

const name = process.argv[2];
if (!name) {
  console.error('Please provide a name for the new computer');
  process.exit(1);
}

// Create file
const sourceFileName = `${NODE_ROOT}/${name}.ts`;
fs.writeFileSync(sourceFileName, sourceFileContent(name));

// Add the file in the index (if it doesn't exist) and sort it
const indexFileName = `${NODE_ROOT}/index.ts`;
const importStatement = `export { ${name} } from './${name}';`;
const indexFileContent = fs.readFileSync(indexFileName, 'utf8');
const alreadyImported = indexFileContent.includes(importStatement);
if(!alreadyImported) {
  const newLines = indexFileContent.trim()
    .split('\n')
    .concat(importStatement)
    .sort()
    .join('\n')
    .concat('\n');

  fs.writeFileSync(indexFileName, newLines);
}

// Create testfile
const testFileName = `${NODE_ROOT}/${name}.test.ts`;
fs.writeFileSync(testFileName, testFileContent(name));

export {}