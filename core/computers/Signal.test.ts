import { expect, it } from "vitest";
import { RunArgs } from "../Computer";
import { when } from "../computerTester/ComputerTester";
import { sleep } from "../utils/sleep";
import { Signal } from "./Signal";
it.todo('how mock sleep?!!', async () => {
  await when(Signal)
    .hasDefaultParams()
    .doRun()
    .expectOutput([1])
    .doRun()
    .expectOutput([1, 2])
    .doRun()
    .expectOutput([1, 2, 3])
    .ok()
})
