import { Input } from "postcss";
import { expect, it, describe } from "vitest";
import { InputTree } from "./InputDevice";
import { LinkId } from "./Link";
import { OutputDevice } from "./OutputDevice";

describe('push', () => {
  it('pushes items to all links connected to port "output"', async () => {
    const tree = {
      output: {
        'Source.1.output--->Target.1.input': [1],
        'Source.1.output--->Target.2.input': [2],
      }
    }

    const linkCounts = new Map<LinkId, number>()
      .set('Source.1.output--->Target.1.input', 1)
      .set('Source.1.output--->Target.2.input', 1)    

    const output = new OutputDevice(tree, linkCounts)

    output.push([100, 200])
    // Ensure both links got the new 100 & 200 item
    expect(tree.output['Source.1.output--->Target.1.input']).toMatchObject([1, 100, 200])
    expect(tree.output['Source.1.output--->Target.2.input']).toMatchObject([2, 100, 200])

    // Ensure counts were incremented
    expect(linkCounts.get('Source.1.output--->Target.1.input')).toBe(3)
    expect(linkCounts.get('Source.1.output--->Target.2.input')).toBe(3)    
  })
})

describe('pushTo', () => {
  it('pushes items to all links connected to a named port', async () => {
    const tree: InputTree = {
      strings: {
        'Source.1.strings--->Target.1.input': ['a'],
        'Source.1.strings--->Target.2.input': ['b'],
      }
    }

    const linkCounts = new Map<LinkId, number>()
      .set('Source.1.strings--->Target.1.input', 1)
      .set('Source.1.strings--->Target.2.input', 1)

    const output = new OutputDevice(tree, linkCounts)

    output.pushTo('strings', ['c'])

    // Ensure both links got the new 'c' item
    expect(tree.strings['Source.1.strings--->Target.1.input']).toMatchObject(['a', 'c'])
    expect(tree.strings['Source.1.strings--->Target.2.input']).toMatchObject(['b', 'c'])

    // Ensure counts were incremented
    expect(linkCounts.get('Source.1.strings--->Target.1.input')).toBe(2)
    expect(linkCounts.get('Source.1.strings--->Target.2.input')).toBe(2)
  })
})