import { expect, it } from "vitest";
import { RunArgs } from "../Computer";
import { when } from "../computerTester/ComputerTester";
import { Request } from "./Request";

it.todo('does something', async () => {
  await when(Request)
    .hasDefaultParams()
    .doRun()
    .expectOutput([1, 2])
    .ok()
})
