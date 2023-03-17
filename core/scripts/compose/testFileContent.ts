export const testFileContent = (name: string) => `import { expect, it } from "vitest";
import { RunArgs } from "../Computer";
import { ${name} } from "./${name}";

it('outputs X when passed Y', async () => {
  // Outputted items stored here
  const output: any[] = [];

  // Mock input/output devices
  const generator = ${name}.run({
    input: {
      pull: () => [1, 2, 3]
    },
    output: {
      push: (items: any[]) => {
        output.push(...items)
      }
    }
  } as RunArgs)

  await generator.next();
  expect(output).toMatchObject([1, 2, 3])
})
`;