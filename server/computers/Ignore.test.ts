import { expect, it, vi } from "vitest";
import { RunArgs } from "../Computer";
import { when } from "../computerTester/ComputerTester";
import { Item } from "../Item";
import { Ignore } from "./Ignore";

it('does nothing', async () => {
  await when(Ignore)
    .hasDefaultParams()
    .getsInput([1, 2, 3])
    .doRun()
    .ok()
})
