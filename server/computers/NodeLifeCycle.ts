import { Param } from "./Param"

export interface NodeLifeCycle {
  type: string
  defaultParams: () => Param[] | Promise<Param[]>
  onBoot?: () => void | Promise<void>
  onCreateItems?: (node: Node) => void | Promise<void>
  onNoItems?: () => void | Promise<void>
  beforeItem?: () => void | Promise<void>
  beforeItems?: () => void | Promise<void>
  afterItem?: () => void | Promise<void>
  afterItems?: () => void | Promise<void>
  onItem?: () => void | Promise<void>
  onItems?: () => void | Promise<void>
  onError?: () => void | Promise<void>
  onSuccess?: () => void | Promise<void>
  onShutdown?: () => void | Promise<void>
}