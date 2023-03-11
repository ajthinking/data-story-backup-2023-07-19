import { Input } from "postcss";
import { expect, it, describe } from "vitest";
import { OutputDevice } from "./OutputDevice";

describe('push', () => {
  it('pushes items to all links connected to port "output"', async () => {
    const tree = {
      output: {
        'Source.1.output-->Target.1.input': [1],
        'Source.1.output-->Target.2.input': [2],
      }
    }

    const output = new OutputDevice(tree)

    output.push([100, 200])
    expect(tree.output['Source.1.output-->Target.1.input']).toMatchObject([1, 100, 200])
    expect(tree.output['Source.1.output-->Target.2.input']).toMatchObject([2, 100, 200])
  })
})

describe('pushTo', () => {
  it('pushes items to all links connected to named port', async () => {
    const tree = {
      strings: {
        'Source.1.strings-->Target.1.input': ['a'],
        'Source.1.strings-->Target.2.input': ['b'],
      }
    }

    const output = new OutputDevice(tree)

    output.pushTo('strings', ['c'])
    expect(tree.strings['Source.1.strings-->Target.1.input']).toMatchObject(['a', 'c'])
    expect(tree.strings['Source.1.strings-->Target.2.input']).toMatchObject(['b', 'c'])
  })
})