import { expect, it } from "vitest";
import { RunArgs } from "../Computer";
import { Multiply } from "./Multiply";

it('outputs the incoming numbers multiplied by two', async () => {
  // Outputted items stored here
  const output: any[] = [];

  // Mock input/output devices
  const generator = Multiply.run({
    input: {
      pull: () => [1,2,3]
    },
    output: {
      push: (items: any[]) => {
        output.push(...items)
      }
    }
  } as RunArgs)

  await generator.next();
  expect(output).toMatchObject([2,4,6])
})

it('can be called forever', async () => {
  // Outputted items will land here  
  const output: any[] = [];

  // Mock input/output devices  
  const generator = Multiply.run({
    input: {
      pull: () => [1]
    },
    output: {
      push: (items: any[]) => {
        output.push(...items)
      }
    }
  } as RunArgs)

  await generator.next();
  expect(output).toMatchObject([2])

  await generator.next();
  expect(output).toMatchObject([2, 2])
  
  await generator.next();
  expect(output).toMatchObject([2, 2, 2])  
})