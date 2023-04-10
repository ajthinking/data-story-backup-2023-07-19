import { LinkId } from "./Link"
import { ItemValue } from "./ItemValue"
import { PortId } from "./Port"
import { ExecutionMemory } from "./ExecutionMemory"
import { PortName } from "./Computer"
import { ItemWithParams } from "./ItemWithParams"
import { Param, ParamValue } from "./Param"

export type PortLinkMap = Record<PortName, LinkId[]>

export interface InputDeviceInterface {
  pull: (count?: number) => ItemWithParams[]
  pullFrom: (name: string, count?: number) => ItemWithParams[]
}

export class InputDevice implements InputDeviceInterface {
  constructor(
    private portLinkMap: PortLinkMap = {},
    private memory: ExecutionMemory,
    private params: Record<string, ParamValue>
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
  pullFrom(name: string, count: number = Infinity): ItemWithParams[] {
    let remaining = count
    const pulled: ItemValue[] = []
    // This one is not using the link items anymore
    // Now we are using the memory!
    // TODO: Slaughter the portLinkMap
    const connectedLinks = this.portLinkMap[name]

    for(const linkId of connectedLinks) {
      const batch = this.memory.pullLinkItems(linkId, remaining)
      pulled.push(...batch)
      remaining -= batch.length
      if(remaining === 0) break
    }

    // enhance ItemValue to ItemWithParams
    return pulled.map(item => new ItemWithParams(item, this.params))
  }

  /**
   * Shorthand to set items while testing
   */
  setItemsAt(linkId: LinkId, items: ItemValue[]) {
    this.memory.setLinkItems(linkId, items)
  }
}