import { expect, it } from "vitest";
import { RunArgs } from "../Computer";
import { when } from "../computerTester/ComputerTester";
import { sleep } from "../utils/sleep";
import { Signal } from "./Signal";
it('outputs items incrementaly', async () => {
  await when(Signal)
    .hasParams({ period: 1 })
    .doRun()
    .expectOutput([1])
    .doRun()
    .expectOutput([1, 2])
    .doRun()
    .expectOutput([1, 2, 3])
    .ok()
})
