import { expect, it } from "vitest";
import { RunArgs } from "../Computer";
import { when } from "../computerTester/ComputerTester";
import { InputDevice } from "../InputDevice";
import { OutputDevice } from "../OutputDevice";
import { Sleep } from "./Sleep";

it('outputs items incrementally', async () => {
  // Outputted items stored here
  const output: any[] = [];

  const link1 = [1, 2]
  const link2 = [3, 4]

  // Mock input/output devices
  const generator = Sleep.run({
    input: new InputDevice({
      'input': { link1, link2 }
    }),
    output: {
      push: (items: any[]) => {
        output.push(...items)
      }
    } as OutputDevice,
    params: {},
  })

  await generator.next();
  expect(output).toMatchObject([1])
  await generator.next();
  expect(output).toMatchObject([1, 2])
  await generator.next();
  expect(output).toMatchObject([1, 2, 3])
  await generator.next();
  expect(output).toMatchObject([1, 2, 3, 4])  
})
