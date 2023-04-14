import { InputDevice } from "./InputDevice";
import { ItemValue } from "./ItemValue";
import { ExecutionMemory } from "./ExecutionMemory";
import { NodeId } from "./Node";
import { LinkId } from "./Link";
import { NodeStatus } from "./Executor";

describe('pull', () => {
  it('returns items at port named "input" wrapped as ItemWithParams', () => {
    const map = {
      input: [
        'Source.1.output--->Target.1.input',
        'Source.2.output--->Target.1.input',
      ],
    }

    const memory = new ExecutionMemory(
      new Map<NodeId, NodeStatus>(),
      new Map<string, AsyncGenerator<undefined, void, void>>(),
      new Map<LinkId, ItemValue[]>(),
      new Map<LinkId, number>(),
    )

    memory.setLinkItems('Source.1.output--->Target.1.input', [1, 2])
    memory.setLinkItems('Source.2.output--->Target.1.input', [3, 4])

    const input = new InputDevice(map, memory, {})

    expect(input.pull()).toMatchObject([
      { value:1 },
      { value:2 },
      { value:3 },
      { value:4 },
    ])
  })

  it('throws if a port named "input" is not present', () => {
    const memory = new ExecutionMemory(
      new Map<NodeId, NodeStatus>(),
      new Map<string, AsyncGenerator<undefined, void, void>>(),
      new Map<LinkId, ItemValue[]>(),
      new Map<LinkId, number>(),
    )

    expect(() => {
      new InputDevice({}, memory, {}).pull()
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
      new Map<LinkId, ItemValue[]>(),
      new Map<LinkId, number>(),
    )

    memory.setLinkItems('Source.1.output--->Target.1.input', [1, 2])
    memory.setLinkItems('Source.2.output--->Target.1.input', [3, 4])

    const input = new InputDevice(map, memory, {})
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
      new Map<LinkId, ItemValue[]>(),
      new Map<LinkId, number>(),
    )

    memory.setLinkItems('Source.1.output--->Target.1.input', [1, 2])
    memory.setLinkItems('Source.2.output--->Target.1.input', [3, 4])

    const input = new InputDevice(map, memory, {})

    expect(input.pull(1)).toMatchObject([{ value: 1 }])
    expect(input.pull(2)).toMatchObject([{ value: 2 }, { value: 3 }])
    expect(input.pull(3)).toMatchObject([{ value: 4 }])
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
      new Map<LinkId, ItemValue[]>(),
      new Map<LinkId, number>(),
    )

    memory.setLinkItems('Source.1.numbers--->Target.1.input', [1, 2])
    memory.setLinkItems('Source.2.numbers--->Target.1.input', [3, 4])

    const input = new InputDevice(map, memory, {})

    expect(input.pullFrom('numbers')).toMatchObject([
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
    ])
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
      new Map<LinkId, ItemValue[]>(),
      new Map<LinkId, number>(),
    )

    memory.setLinkItems('Source.1.numbers--->Target.1.input', [1, 2])
    memory.setLinkItems('Source.2.numbers--->Target.1.input', [3, 4])

    const input = new InputDevice(map, memory, {})
    input.pullFrom('numbers')

    const atLink1 = memory.getLinkItems('Source.1.numbers--->Target.1.input')
    const atLink2 = memory.getLinkItems('Source.2.numbers--->Target.1.input')
    
    
    expect(atLink1).toMatchObject([])
    expect(atLink2).toMatchObject([])
  })  
})

describe('params', () => {
  it('has getters for params returning interpolated values', () => {
    const map = {
      input: [
        'Source.1.output--->Target.1.input',
      ],
    }

    const memory = new ExecutionMemory(
      new Map<NodeId, NodeStatus>(),
      new Map<string, AsyncGenerator<undefined, void, void>>(),
      new Map<LinkId, ItemValue[]>(),
      new Map<LinkId, number>(),
    )

    const params = {
      greeting: 'Hello ${name}',
    }

    memory.setLinkItems('Source.1.output--->Target.1.input', [
      { name: 'Bob' },
    ])

    const input = new InputDevice(map, memory, params)

    const [ item ] = input.pull()

    expect(item.params.greeting).toBe('Hello Bob')
  })
})