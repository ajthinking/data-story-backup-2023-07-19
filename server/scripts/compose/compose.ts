import fs from 'fs';
import { sourceFileContent } from './sourceFileContent';
import { testFileContent } from './testFileContent';

const NODE_ROOT = 'server/computers';

const name = process.argv[2];
if (!name) {
  console.error('Please provide a name for the new computer');
  process.exit(1);
}

// Create file
const sourceFileName = `${NODE_ROOT}/${name}.ts`;
fs.writeFileSync(sourceFileName, sourceFileContent(name));

// Create testfile
const testFileName = `${NODE_ROOT}/${name}.test.ts`;
fs.writeFileSync(testFileName, testFileContent(name));

export {}