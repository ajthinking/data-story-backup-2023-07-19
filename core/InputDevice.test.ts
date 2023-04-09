import { Input } from "postcss";
import { expect, it, describe } from "vitest";
import { InputDevice } from "./InputDevice";
import { Item } from "./Item";
import { ExecutionMemory } from "./ExecutionMemory";
import { NodeId } from "./Node";
import { LinkId } from "./Link";
import { NodeStatus } from "./Executor";

describe('pull', () => {
  it('returns items at port named "input"', () => {
    const map = {
      input: [
        'Source.1.output--->Target.1.input',
        'Source.2.output--->Target.1.input',
      ],
    }

    const memory = new ExecutionMemory(
      new Map<NodeId, NodeStatus>(),
      new Map<string, AsyncGenerator<undefined, void, void>>(),
      new Map<LinkId, Item[]>(),
      new Map<LinkId, number>(),
    )

    memory.setLinkItems('Source.1.output--->Target.1.input', [1, 2])
    memory.setLinkItems('Source.2.output--->Target.1.input', [3, 4])

    const input = new InputDevice(map, memory)

    expect(input.pull()).toMatchObject([1,2,3,4])
  })

  it('throws if a port named "input" is not present', () => {
    const memory = new ExecutionMemory(
      new Map<NodeId, NodeStatus>(),
      new Map<string, AsyncGenerator<undefined, void, void>>(),
      new Map<LinkId, Item[]>(),
      new Map<LinkId, number>(),
    )

    expect(() => {
      new InputDevice({}, memory).pull()
    }).toThrowError()
  })  

  it('removes the items pulled from the links', () => {
    const map = {
      input: [
        'Source.1.output--->Target.1.input',
        'Source.2.output--->Target.1.input',
      ],
    }

    const memory = new ExecutionMemory(
      new Map<NodeId, NodeStatus>(),
      new Map<string, AsyncGenerator<undefined, void, void>>(),
      new Map<LinkId, Item[]>(),
      new Map<LinkId, number>(),
    )

    memory.setLinkItems('Source.1.output--->Target.1.input', [1, 2])
    memory.setLinkItems('Source.2.output--->Target.1.input', [3, 4])

    const input = new InputDevice(map, memory)
    input.pull()

    const atLink1 = memory.getLinkItems('Source.1.output--->Target.1.input')
    const atLink2 = memory.getLinkItems('Source.2.output--->Target.1.input')
    
    
    expect(atLink1).toMatchObject([])
    expect(atLink2).toMatchObject([])
  })

  it('may pull a specified number of items', () => {
    const map = {
      input: [
        'Source.1.output--->Target.1.input',
        'Source.2.output--->Target.1.input',
      ],
    }

    const memory = new ExecutionMemory(
      new Map<NodeId, NodeStatus>(),
      new Map<string, AsyncGenerator<undefined, void, void>>(),
      new Map<LinkId, Item[]>(),
      new Map<LinkId, number>(),
    )

    memory.setLinkItems('Source.1.output--->Target.1.input', [1, 2])
    memory.setLinkItems('Source.2.output--->Target.1.input', [3, 4])

    const input = new InputDevice(map, memory)

    expect(input.pull(1)).toMatchObject([1])
    expect(input.pull(2)).toMatchObject([2,3])
    expect(input.pull(3)).toMatchObject([4])
  })
})

describe('pullFrom', () => {
  it('returns items at named port', () => {
    const map = {
      numbers: [
        'Source.1.numbers--->Target.1.input',
        'Source.2.numbers--->Target.1.input',
      ],
    }

    const memory = new ExecutionMemory(
      new Map<NodeId, NodeStatus>(),
      new Map<string, AsyncGenerator<undefined, void, void>>(),
      new Map<LinkId, Item[]>(),
      new Map<LinkId, number>(),
    )

    memory.setLinkItems('Source.1.numbers--->Target.1.input', [1, 2])
    memory.setLinkItems('Source.2.numbers--->Target.1.input', [3, 4])

    const input = new InputDevice(map, memory)

    expect(input.pullFrom('numbers')).toMatchObject([1,2,3,4])
  })

  it('removes the items pulled from the links', () => {
    const map = {
      numbers: [
        'Source.1.numbers--->Target.1.input',
        'Source.2.numbers--->Target.1.input',
      ],
    }

    const memory = new ExecutionMemory(
      new Map<NodeId, NodeStatus>(),
      new Map<string, AsyncGenerator<undefined, void, void>>(),
      new Map<LinkId, Item[]>(),
      new Map<LinkId, number>(),
    )

    memory.setLinkItems('Source.1.numbers--->Target.1.input', [1, 2])
    memory.setLinkItems('Source.2.numbers--->Target.1.input', [3, 4])

    const input = new InputDevice(map, memory)
    input.pullFrom('numbers')

    const atLink1 = memory.getLinkItems('Source.1.numbers--->Target.1.input')
    const atLink2 = memory.getLinkItems('Source.2.numbers--->Target.1.input')
    
    
    expect(atLink1).toMatchObject([])
    expect(atLink2).toMatchObject([])
  })  
})