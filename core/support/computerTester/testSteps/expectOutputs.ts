import { expect } from "vitest";
import { Item } from "../../../Item";
import { ComputerTester } from "../ComputerTester";
import { TestStep } from "../TestStep";

export const expectOutputs: TestStep = {
  async handle(tester: ComputerTester, expectedOutputs: { [key: string]: Item[]}) {
    const actual = Object.keys(expectedOutputs).reduce((acc, key) => {
      acc[key] = tester.outputDevice!.itemsOutputtedThrough(key);
      return acc
    }, {} as { [key: string]: Item[] });

    expect(actual).toMatchObject(expectedOutputs)
  }
}