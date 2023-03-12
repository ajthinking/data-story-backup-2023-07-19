import { expect, it } from "vitest";
import { RunArgs } from "../Computer";
import { Pass } from "./Pass";

it('outputs the input ontouched', async () => {
  // Outputted items stored here
  const output: any[] = [];

  // Mock input/output devices
  const generator = Pass.run({
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
