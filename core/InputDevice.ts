import { LinkId } from "./Link"
import { Item } from "./Item"
import { PortId } from "./Port"
import { ExecutionMemory } from "./ExecutionMemory"
import { PortName } from "./Computer"

type InputStatus = 'AWAITING' | 'COMPLETE' | 'EXHAUSTED'

type LinkItems = Record<LinkId, Item[]>

/**
 * Example:
 * {
 *   input: {
 *     'Source.1.output--->Target.1.input': [1, 2]
 *     'Source.2.output--->Target.1.input': [3, 4, 5]
 *   },
 *   another: {
  *    'Source.3.output--->Target.1.another': ['a text']
 *   }
 * }
 */
export type InputTree = Record<PortId, LinkItems>

export type PortLinkMap = Record<PortName, LinkId[]>

export interface InputDeviceInterface {
  pull: (count?: number) => Item[]
  pullFrom: (name: string, count?: number) => Item[]
}

export class InputDevice implements InputDeviceInterface {
  constructor(
    private portLinkMap: PortLinkMap = {},
    private memory: ExecutionMemory,
  ) {}

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
  pullFrom(name: string, count: number = Infinity) {
    let remaining = count
    const pulled: Item[] = []
    // This one is not using the link items anymore
    // Now we are using the memory!
    // TODO: Slaughter the portLinkMap
    const connectedLinks = this.portLinkMap[name]

    for(const linkId of connectedLinks) {
      const taken = this.memory.pullLinkItems(linkId, remaining)
      pulled.push(...taken)
      remaining -= taken.length
      if(remaining === 0) break
    }

    return pulled
  }

  /**
   * Shorthand to set items while testing
   */
  setItemsAt(linkId: LinkId, items: Item[]) {
    this.memory.setLinkItems(linkId, items)
  }
}