// Import required modules
import fs from 'fs';
import path from 'path';

const prompt = `
You will be given a project as a JSON file.

Your task is to write the Readme file.
It should be suitable to put on github.
It should contain emojis, code examples and more.

Here comes the JSON:

`

async function readDirectory(
  dir: string,
  ignoreList: string[] = [
    'node_modules',
    '.git',
    '*.log',
    '*.lock',
  ],
): Promise<{ [key: string]: string }> {
  const result: { [key: string]: string } = {};

  function shouldIgnore(filePath: string): boolean {
    const relativePath = path.relative(dir, filePath);
    return ignoreList.some((ignorePattern) => {
      if (ignorePattern.includes('*')) {
        const regexPattern = ignorePattern.replace('.', '\\.').replace('*', '.*');
        const regex = new RegExp(regexPattern);
        return regex.test(relativePath);
      }
      return relativePath.startsWith(ignorePattern);
    });
  }

  // Helper function to read files and directories recursively
  async function read(filePath: string): Promise<void> {
    if (shouldIgnore(filePath)) return;

    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      const files = await fs.promises.readdir(filePath);
      await Promise.all(files.map((file) => read(path.join(filePath, file))));
    } else if (stats.isFile()) {
      const content = await fs.promises.readFile(filePath, 'utf8');
      const relativePath = path.relative(dir, filePath);
      result[relativePath] = content;
    }
  }

  await read(dir);
  return result;
}

// Main function to encode a project into a single JSON file
export async function encodeProjectToJSON(
  projectPath: string,
  outputFilePath: string
): Promise<void> {
  const projectJSON = await readDirectory(projectPath, [
    'node_modules',
    '.git',
    '*.log',
    '*.lock',
    'project_encoded.json',
    '.datastory',
    '.vscode',
    '.next',
    '.vercel',
    'coverage',
    '.env',
    '.env.local',
    'yarn-error.log',
    'yarn.lock',
    'package-lock.json',
    '*.md',
    '*.test.ts',
    'support',
    'utils',
    'experiments',
    'Storage.ts',
    'FileStorage.ts',
    'Executor.ts',
    'ExecutionResult.ts',
    'Execution.ts',
    'ExecutionUpdate.ts',
    'computers', 
  ]);

  const content = prompt + JSON.stringify(projectJSON, null, 2)

  console.log(`Content length: ${content.length}`)

  await fs.promises.writeFile(outputFilePath, content);
}

// Change these paths as needed
const projectPath = '/Users/anders/Code/data-story/core';
const outputFilePath = './project_encoded.json';

encodeProjectToJSON(projectPath, outputFilePath)
  .then(() => console.log('Project encoded successfully!'))
  .catch((err) => console.error('Error:', err));