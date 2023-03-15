import { expect } from "vitest";
import { Item } from "../../Item";
import { ComputerTester } from "../ComputerTester";
import { TestStep } from "../TestStep";

export const expectOutput: TestStep = {
  async handle(tester: ComputerTester, expectedOutput: Item[]) {

    const actual = tester.outputDevice!.itemsOutputtedThrough('output');

    expect(actual).toMatchObject(expectedOutput)
  }
}