import { expect, it, describe } from "vitest";
import { LinkId } from "./Link";
import { OutputDevice } from "./OutputDevice";
import { ExecutionMemory } from "./ExecutionMemory";
import { NodeStatus } from "./Executor";
import { NodeId } from "./Node";
import { ItemValue } from "./ItemValue";

describe('push', () => {
  it('pushes items to all links connected to port "output"', async () => {
    const map = {
      output: [
        'Source.1.output--->Target.1.input',
        'Source.1.output--->Target.2.input',
      ],
    }

    const memory = new ExecutionMemory(
      new Map<NodeId, NodeStatus>(),
      new Map<string, AsyncGenerator<undefined, void, void>>(),
      new Map<LinkId, ItemValue[]>(),
      new Map<LinkId, number>(),
    )

    memory.setLinkItems('Source.1.output--->Target.1.input', [1])
    memory.setLinkItems('Source.1.output--->Target.2.input', [2])
    
    memory.setLinkCount('Source.1.output--->Target.1.input', 1)
    memory.setLinkCount('Source.1.output--->Target.2.input', 1)

    const output = new OutputDevice(map, memory)

    output.push([100, 200])
    // Ensure both links got the new 100 & 200 item
    expect(memory.getLinkItems('Source.1.output--->Target.1.input')).toMatchObject([1, 100, 200])
    expect(memory.getLinkItems('Source.1.output--->Target.2.input')).toMatchObject([2, 100, 200])

    // Ensure counts were incremented
    expect(memory.getLinkCount('Source.1.output--->Target.1.input')).toBe(3)
    expect(memory.getLinkCount('Source.1.output--->Target.2.input')).toBe(3)
  })
})

describe('pushTo', () => {
  it('pushes items to all links connected to a named port', async () => {
    const map = {
      strings: [
        'Source.1.strings--->Target.1.input',
        'Source.1.strings--->Target.2.input',
      ],
    }

    const memory = new ExecutionMemory(
      new Map<NodeId, NodeStatus>(),
      new Map<string, AsyncGenerator<undefined, void, void>>(),
      new Map<LinkId, ItemValue[]>(),
      new Map<LinkId, number>(),
    )

    memory.setLinkItems('Source.1.strings--->Target.1.input', ['a'])
    memory.setLinkItems('Source.1.strings--->Target.2.input', ['b'])
    
    memory.setLinkCount('Source.1.strings--->Target.1.input', 1)
    memory.setLinkCount('Source.1.strings--->Target.2.input', 1)    

    const output = new OutputDevice(map, memory)

    output.pushTo('strings', ['c'])

    // Ensure both links got the new 'c' item
    expect(memory.getLinkItems('Source.1.strings--->Target.1.input')).toMatchObject(['a', 'c'])
    expect(memory.getLinkItems('Source.1.strings--->Target.2.input')).toMatchObject(['b', 'c'])

    // Ensure counts were incremented
    expect(memory.getLinkCount('Source.1.strings--->Target.1.input')).toBe(2)
    expect(memory.getLinkCount('Source.1.strings--->Target.2.input')).toBe(2)
  })
})