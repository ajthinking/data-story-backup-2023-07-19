import { expect, it, vi } from "vitest";
import { when } from "../support/computerTester/ComputerTester";
import { Log } from "./Log";

it('does something', async () => {

  const warn = vi.spyOn(console, "log").mockImplementation(() => {});

  await when(Log)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .ok()
  
  expect(warn).toHaveBeenCalledWith(JSON.stringify([1, 2], null, 2))
})
