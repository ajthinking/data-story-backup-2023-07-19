import { when } from "../../support/computerTester/ComputerTester";
import { Throw } from "./Throw";

it('throws with a default message', async () => {
  await when(Throw)
    .hasDefaultParams()
    .getsInput([1])
    .expectError("Some error")
    .doRun()
    .ok()
})
