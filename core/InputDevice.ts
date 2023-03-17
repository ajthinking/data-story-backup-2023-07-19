import { LinkId } from "./Link"
import { Item } from "./Item"
import { PortId } from "./Port"

type InputStatus = 'AWAITING' | 'COMPLETE' | 'EXHAUSTED'

type LinkItems = Record<LinkId, Item[]>

/**
 * Example:
 * {
 *   input: {
 *     'Source.1.output<--->Target.1.input': [1, 2]
 *     'Source.2.output<--->Target.1.input': [3, 4, 5]
 *   },
 *   another: {
  *    'Source.3.output<--->Target.1.another': ['a text']
 *   }
 * }
 */
export type InputTree = Record<PortId, LinkItems>

export interface InputDeviceInterface {
  pull: (count?: number) => Item[]
  pullFrom: (name: string, count?: number) => Item[]
}

export class InputDevice implements InputDeviceInterface {
  constructor(private inputTree: InputTree = {}) {}

  // haveItemsAtInput(name: string): boolean {}

  // haveAllItemsAtInput(name: string): boolean {}

  // haveNoItemsAtInput(name: string): boolean {}

  /**
   * Shorthand to pull items at 'input'
   */
  pull(count?: number) {
    return this.pullFrom('input', count)
  }

  /**
   * Removes and return items at edges connected to input with name 
   */
  pullFrom(name: string, count?: number) {
    let remaining = count || Infinity
    const pulled: Item[] = []
    const connectedLinks = this.inputTree[name]
    const incomingItemLists = Object.values(connectedLinks)

    for(const itemList of incomingItemLists) {
      // splice will *removes* them from the inputTree
      const taken = itemList.splice(0, remaining)
      pulled.push(...taken)
      remaining -= taken.length
      if(remaining === 0) break
    }

    return pulled
  }

  /**
   * Shorthand to set items while testing
   */
  setItemsAt(portName: string, linkId: LinkId, items: Item[]) {
    this.inputTree[portName][linkId] = items
  }
}