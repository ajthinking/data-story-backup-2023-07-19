import { when } from "../support/computerTester/ComputerTester";
import { AskChatGpt } from "./AskChatGpt";

it.todo('does something', async () => {
  await when(AskChatGpt)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1, 2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([1, 2, 3, 4])
    .ok()
})
