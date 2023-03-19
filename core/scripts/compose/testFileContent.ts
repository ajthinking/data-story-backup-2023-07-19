export const testFileContent = (name: string) => `import { expect, it } from "vitest";
import { RunArgs } from "../Computer";
import { when } from "../computerTester/ComputerTester";
import { ${name} } from "./${name}";

it('does something', async () => {
  await when(${name})
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1, 2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([1, 2, 3, 4])
    .ok()
})
`;