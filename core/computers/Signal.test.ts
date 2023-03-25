import { it } from "vitest";
import { when } from "../support/computerTester/ComputerTester";
import { Signal } from "./Signal";
it('outputs items incrementaly', async () => {
  await when(Signal)
    .hasParams({ period: 1, count: 3 })
    .doRun()
    .expectOutput([1])
    .doRun()
    .expectOutput([1, 2])
    .doRun()
    .expectOutput([1, 2, 3])
    .ok()
})
