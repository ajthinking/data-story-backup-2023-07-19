import { when } from "../../support/computerTester/ComputerTester";
import { Ignore } from "./Ignore";

it('does nothing', async () => {
  await when(Ignore)
    .hasDefaultParams()
    .getsInput([1, 2, 3])
    .doRun()
    .ok()
})
