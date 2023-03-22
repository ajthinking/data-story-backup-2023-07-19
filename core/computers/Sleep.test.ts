import { it } from "vitest";
import { when } from "../computerTester/ComputerTester";
import { Sleep } from "./Sleep";

it('outputs items incrementally', async () => {
  await when(Sleep)
    .hasParams({ duration: 1 })
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1])
    .doRun()
    .expectOutput([1, 2])
    .ok()
})
