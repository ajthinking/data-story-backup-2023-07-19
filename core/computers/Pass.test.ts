import { RunArgs } from "../Computer";
import { when } from "../support/computerTester/ComputerTester";
import { Pass } from "./Pass";

it('outputs the input ontouched', async () => {
  await when(Pass)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1, 2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([1, 2, 3, 4])
    .ok()
})