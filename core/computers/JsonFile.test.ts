import { expect, it } from "vitest";
import { RunArgs } from "../Computer";
import { when } from "../support/computerTester/ComputerTester";
import { JsonFile } from "./JsonFile";

it('does something', async () => {
  await when(JsonFile)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1, 2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([1, 2, 3, 4])
    .ok()
})
