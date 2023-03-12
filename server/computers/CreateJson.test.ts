import { expect, it } from "vitest";
import { RunArgs } from "../Computer";
import { CreateJson } from "./CreateJson";

it('outputs X when passed Y', async () => {
  // Outputted items stored here
  const output: any[] = [];

  // Mock input/output devices
  const generator = CreateJson.run({
    output: {
      push: (items: any[]) => {
        output.push(...items)
      }
    }
  } as RunArgs) // Am I evil? Yes. But it's just a test. But Matt Pocock said there was a solution for this??

  await generator.next();
  expect(output).toMatchObject([
    {id: 1},
    {id: 2},
    {id: 3},
  ])
})
