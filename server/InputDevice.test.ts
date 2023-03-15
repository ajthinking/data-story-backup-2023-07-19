import { Input } from "postcss";
import { expect, it, describe } from "vitest";
import { InputDevice, InputTree } from "./InputDevice";
import { Item } from "./Item";

describe('pull', () => {
  it('returns items at port named "input"', () => {
    const input = new InputDevice({
      input: {
        'Source.1.output-->Target.1.input': [1, 2],
        'Source.2.output-->Target.1.input': [3, 4],
      },
    })

    expect(input.pull()).toMatchObject([1,2,3,4])
  })

  it('throws if a port named "input" is not present', () => {
    expect(() => {
      new InputDevice({}).pull()
    }).toThrowError()
  })  

  it('removes the items pulled from the links', () => {
    const tree: InputTree = {
      input: {
        'Source.1.output-->Target.1.input': [1, 2],
        'Source.2.output-->Target.1.input': [3, 4],
      },
    }

    new InputDevice(tree).pull()

    const atLink1 = tree.input['Source.1.output-->Target.1.input']
    const atLink2 = tree.input['Source.2.output-->Target.1.input']
    
    
    expect(atLink1).toMatchObject([])
    expect(atLink2).toMatchObject([])
  })

  it('may pull a specified number of items', () => {
    const input = new InputDevice({
      input: {
        'Source.1.output-->Target.1.input': [1, 2],
        'Source.2.output-->Target.1.input': [3, 4],
      },
    })

    expect(input.pull(1)).toMatchObject([1])
    expect(input.pull(2)).toMatchObject([2,3])
    expect(input.pull(3)).toMatchObject([4])
  })
})

describe('pullFrom', () => {
  it('returns items at named port', () => {
    const input = new InputDevice({
      numbers: {
        'Source.1.output-->Target.1.numbers': [1, 2],
        'Source.2.output-->Target.1.numbers': [3, 4],
      },
    })

    expect(input.pullFrom('numbers')).toMatchObject([1,2,3,4])
  })

  it('removes the items pulled from the links', () => {
    const tree: InputTree = {
      numbers: {
        'Source.1.output-->Target.1.numbers': [1, 2],
        'Source.2.output-->Target.1.numbers': [3, 4],
      },
    }

    new InputDevice(tree).pullFrom('numbers')

    const atLink1 = tree.numbers['Source.1.output-->Target.1.numbers']
    const atLink2 = tree.numbers['Source.2.output-->Target.1.numbers']
    
    
    expect(atLink1).toMatchObject([])
    expect(atLink2).toMatchObject([])
  })  
})