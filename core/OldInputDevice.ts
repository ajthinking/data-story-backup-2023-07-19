import { LinkId } from "./Link"
import { ItemValue } from "./ItemValue"
import { PortId } from "./Port"
import { ExecutionMemory } from "./ExecutionMemory"
import { PortName } from "./Computer"
import { ItemWithParams } from "./ItemWithParams"
import { Param, ParamValue } from "./Param"

export type PortLinkMap = Record<PortName, LinkId[]>

/**
 * @deprecated This interface is no longer supported and should not be used.
 */
export interface OldInputDeviceInterface {
  pull: (count?: number) => ItemWithParams[]
  pullFrom: (name: string, count?: number) => ItemWithParams[]
}

/**
 * @deprecated This class is no longer supported and should not be used.
 */
export class OldInputDevice implements OldInputDeviceInterface {
  constructor(
    private portLinkMap: PortLinkMap = {},
    private memory: ExecutionMemory,
    private params: Record<string, ParamValue>
  ) {}

  // To complete these, we need to be able to access
  // the nodes spawning the items to the links.
  // This is not currently possible.
  // To achieve this we need a way to go from linkId to sourceNodeId
  // That information lives in "diagram"
  // We could pass in the diagram, but that would be a circular dependency
  // Consider not passing in the portLinkMap, but instead the whole diagram
  // Yes, the portLinkMap does have its place as a cache
  // But we can generate it in the constructor
  // However, this requires we also know the acting node
  // So we need to pass in: actingNode, diagram, memory, params
  // Now this starts to get a lot of passing and constructing
  // Therefore, consider using a factory: InputDeviceFactory
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