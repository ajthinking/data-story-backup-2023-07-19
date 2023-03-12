import { expect, it, vi } from "vitest";
import { RunArgs } from "../Computer";
import { Item } from "../Item";
import { Accept } from "./Accept";

it('pulls items from input', async () => {
  // Mock input device
  const pull = vi.fn(() => [1, 2, 3])
  const generator = Accept.run({
    input: {
      pull: pull as () => Item[]
    },
  } as RunArgs)

  const update = await generator.next();
  expect(pull).toHaveBeenCalledTimes(1)
})
