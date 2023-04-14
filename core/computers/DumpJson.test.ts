import { RunArgs } from "../Computer";
import { when } from "../support/computerTester/ComputerTester";
import { DumpJson } from "./DumpJson";

it.todo('does something', async () => {
  await when(DumpJson)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1, 2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([1, 2, 3, 4])
    .ok()
})
