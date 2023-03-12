## 2023-03-05
### Separate diagram from computing and storage
```ts
// A serialized diagram reaches the backend
const diagram = JSON.parse(data)

const computers = ComputerFactory.from(diagram.nodes)
const diagram = DiagramFactory.from(diagram)
const storage = {}
const executor = new Executor

const executor.execute({
  diagram,
  computers,
  storage
})

diagram.nodes // [{type: Create}, {type: Pass}]
```

### How can we determine if something can run?
```ts
function canRun(node, diagram, storage) {
  // The node must be in a ready state
  if(storage.getNodeState(node.id) !== READY) return false;

  // When node creates new items
  if(node.onCreateItems) return true

  // We need awaiting features
  if(!diagram.hasAwaitingItems(node)) return false

  // If the node can process single items (???)
  if(node.onItem && newItems > 0) return true

  // If the node can process multiple items (???)
  if(node.onItems && hasNewItems > 2) return true

  // If the node has ALL incoming items ready
  if(node.onAllItems && hasAllItemsReady) return true

  // If we reach this we missed something
  throw new Exception("Could not determine wether node was ready to run.")
}
```

## 2023-03-08

### How can we determine if something can run? (continued)
Consider a node `Merge` with inputs `requestor` and `supplier`.
The `Merge` node would merge properties from a supplier onto the requestor.
This implies all items must have reached the supplier port before processing can begin. Further on this means that the node is blocking, but not fully blocking.

Consider a life cycle hook where we register:
```ts
  /**
   * The Node Computer is not aware of its souroundings
   * But we can pass a context and let it decide if it is ready
   **/
  canRun(context) {
    return context.haveItemsAt('requestor')
      && context.haveAllItemsAt('supplier')
  }
```

Or, simple properties:
{
  needsItemsAt: ['requestor'],
  needsAllItemsAt: ['supplier'],
}

### Storage responsibility
Should node status live at Storage? Maybe it make more sense to have it live in the Execution object? Yes, fixed!

### Input & OutputDevices
Dependency injection to keep Node Computers from being entangled in the execution.

### Overall
Great progress and very fun!

## 2023-03-12
Ideas about hooks...
```ts
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
```