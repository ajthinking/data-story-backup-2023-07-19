import { it } from "vitest";
import { when } from "../computerTester/ComputerTester";
import { Multiply } from "./Multiply";

it('outputs the incoming numbers multiplied by two', async () => {
  await when(Multiply)
    .hasDefaultParams()
    .getsInput([1])
    .doRun()
    .expectOutput([2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([2, 6, 8])
    .ok()
})