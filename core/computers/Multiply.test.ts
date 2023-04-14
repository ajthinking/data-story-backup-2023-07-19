import { when } from "../support/computerTester/ComputerTester";
import { Multiply } from "./Multiply";

it('outputs the incoming numbers multiplied by two by default', async () => {
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

it('outputs the incoming numbers multiplied by param factor', async () => {
  await when(Multiply)
    .hasParams({ factor: 7 })
    .getsInput([1])
    .doRun()
    .expectOutput([7])
    .ok()
})