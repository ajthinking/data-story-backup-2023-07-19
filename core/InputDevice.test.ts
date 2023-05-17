import { Diagram } from "./Diagram"
import { ExecutionMemory } from "./ExecutionMemory"
import { InputDevice } from "./InputDevice"
import { Link } from "./Link"
import { Node } from "./Node"

describe('pull', () => {
  it('returns items at port named "input" wrapped as ItemWithParams', () => {
    const node = new Node({
      id: 'target',
      type: 'node-type',  
      inputs: [{id: 'target-input-id', name: 'input'}],
      outputs: [],
    })

    const links = [
      new Link('link-1', 'dangling-1', 'target-input-id'),
      new Link('link-2', 'dangling-2', 'target-input-id'),
    ]

    const diagram = new Diagram([node], links)

    const memory = new ExecutionMemory({
      linkItems: new Map()
        .set('link-1', [1, 2])
        .set('link-2', [3, 4])      
    })

    const input = new InputDevice(node, diagram, memory, {})

    expect(input.pull()).toMatchObject([
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
    ])
  })

  it('throws if a port named "input" is not present', () => {
    const memory = new ExecutionMemory()

    expect(() => {
      const node = new Node({
        id: 'target',
        type: 'node-type',  
        inputs: [{id: 'target-input-id', name: 'some-other-name'}],
        outputs: [],
      })

      const diagram = new Diagram([node], [])

      const memory = new ExecutionMemory()

      new InputDevice(node, diagram, memory, {}).pull()
    }).toThrowError()
  })

  it('removes the items pulled from the links', () => {
    const node = new Node({
      id: 'target',
      type: 'node-type',  
      inputs: [{id: 'target-input-id', name: 'input'}],
      outputs: [],
    })

    const links = [
      new Link('link-1', 'dangling-1', 'target-input-id'),
      new Link('link-2', 'dangling-2', 'target-input-id'),
    ]

    const diagram = new Diagram([node], links)

    const memory = new ExecutionMemory({
      linkItems: new Map()
        .set('link-1', [1, 2])
        .set('link-2', [3, 4])      
    })

    const input = new InputDevice(node, diagram, memory, {})
    input.pull()

    const atLink1 = memory.getLinkItems('link-1')
    const atLink2 = memory.getLinkItems('link-2')


    expect(atLink1).toMatchObject([])
    expect(atLink2).toMatchObject([])
  })

  it('may pull a specified number of items', () => {
    const node = new Node({
      id: 'target',
      type: 'node-type',  
      inputs: [{id: 'target-input-id', name: 'input'}],
      outputs: [],
    })

    const links = [
      new Link('link-1', 'dangling-1', 'target-input-id'),
      new Link('link-2', 'dangling-2', 'target-input-id'),
    ]

    const diagram = new Diagram([node], links)

    const memory = new ExecutionMemory({
      linkItems: new Map()
        .set('link-1', [1, 2])
        .set('link-2', [3, 4])      
    })

    const input = new InputDevice(node, diagram, memory, {})

    expect(input.pull(1)).toMatchObject([{ value: 1 }])
    expect(input.pull(2)).toMatchObject([{ value: 2 }, { value: 3 }])
    expect(input.pull(3)).toMatchObject([{ value: 4 }])
  })  
})

describe('pullFrom', () => {
  it('returns items at named port', () => {
    const node = new Node({
      id: 'target',
      type: 'node-type',  
      inputs: [{id: 'target-input-id', name: 'numbers'}],
      outputs: [],
    })

    const links = [
      new Link('link-1', 'dangling-1', 'target-input-id'),
      new Link('link-2', 'dangling-2', 'target-input-id'),
    ]

    const diagram = new Diagram([node], links)

    const memory = new ExecutionMemory({
      linkItems: new Map()
        .set('link-1', [1, 2])
        .set('link-2', [3, 4])      
    })

    const input = new InputDevice(node, diagram, memory, {})

    expect(input.pullFrom('numbers')).toMatchObject([
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
    ])
  })

  it('removes the items pulled from the links', () => {
    const node = new Node({
      id: 'target',
      type: 'node-type',  
      inputs: [{id: 'target-input-id', name: 'numbers'}],
      outputs: [],
    })

    const links = [
      new Link('link-1', 'dangling-1', 'target-input-id'),
      new Link('link-2', 'dangling-2', 'target-input-id'),
    ]

    const diagram = new Diagram([node], links)

    const memory = new ExecutionMemory({
      linkItems: new Map()
        .set('link-1', [1, 2])
        .set('link-2', [3, 4])      
    })

    const input = new InputDevice(node, diagram, memory, {})
    input.pullFrom('numbers')

    const atLink1 = memory.getLinkItems('link-1')
    const atLink2 = memory.getLinkItems('link-2')


    expect(atLink1).toMatchObject([])
    expect(atLink2).toMatchObject([])
  })  
})