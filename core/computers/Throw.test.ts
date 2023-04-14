import { when } from "../support/computerTester/ComputerTester";
import { Throw } from "./Throw";

it.todo('throws with a default message', async () => {
  await when(Throw)
    .hasDefaultParams()
    .getsInput([1])
    .doRun()
    // .expectThrownMessage("Error: The Node 'Throw' threw an Error.")
    .ok()
})
