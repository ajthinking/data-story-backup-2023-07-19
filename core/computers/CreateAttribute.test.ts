import { it } from "vitest";
import { when } from "../support/computerTester/ComputerTester";
import { CreateAttribute } from "./CreateAttribute";

it('sets an attribute key value on the item', async () => {
  await when(CreateAttribute)
    .hasParams({
      key: 'coolness',
      value: 'high',
    })
    .getsInput([{}])
    .doRun()
    .expectOutput([{ coolness: 'high' }])
    .ok()
})