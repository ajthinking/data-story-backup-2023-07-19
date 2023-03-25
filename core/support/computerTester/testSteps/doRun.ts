import { expect } from "vitest";
import { ComputerTester } from "../ComputerTester";
import { TestStep } from "../TestStep";

export const doRun: TestStep = {
  async handle(tester: ComputerTester) {
    await tester.runner!.next()
  }
}