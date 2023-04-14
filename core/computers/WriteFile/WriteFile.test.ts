import { when } from "../../support/computerTester/ComputerTester";
import { WriteFile } from "./WriteFile";

it('does something', async () => {
  await when(WriteFile)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1, 2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([1, 2, 3, 4])
    .ok()
})
