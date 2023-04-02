import { expect, it } from "vitest";
import { when } from "../support/computerTester/ComputerTester";
import { Throw } from "./Throw";

it.todo('does something', async () => {
  await when(Throw)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1, 2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([1, 2, 3, 4])
    .ok()
})
