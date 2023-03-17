import { expect, it } from "vitest";
import { RunArgs } from "../Computer";
import { when } from "../computerTester/ComputerTester";
import { InputDevice } from "../InputDevice";
import { OutputDevice } from "../OutputDevice";
import { Sleep } from "./Sleep";

it('outputs items incrementally', async () => {
  await when(Sleep)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1])
    .doRun()
    .expectOutput([1, 2])
    .ok() 
})
