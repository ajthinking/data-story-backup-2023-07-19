import { NodeLifeCycle } from "./NodeLifeCycle"

export const Create: NodeLifeCycle = {
  type: 'Create',
  defaultParams: () => {
    return [
    ]
  },

  // onCreateItems: (node: Node) => {
  //   const value = node.valueOfParam('value')

  //   node.outputItems([value])
  // }
}

const CreateJson: NodeLifeCycle = {
  type: 'CreateJson',
  defaultParams: () => {
    return [
      // displayNameParam('Create JSON'),
      // ...typedInputParamGroup(),
    ]
  }
}

const CreatorsFactory = {
  nodes() {
    return [
      Create,
      CreateJson,
      // CreateStream // Example: 1 item every second
    ]
  }
}

const NodeLifeCycleFactory = {
  nodes() {
    return [
      ...CreatorsFactory.nodes(),
    ]
  },
}

type PartialNodeLifeCycleWithType = Partial<NodeLifeCycle> & Pick<NodeLifeCycle, 'type'>

const NodeLifeCycleHydrator = {
  hydrate(node: PartialNodeLifeCycleWithType): NodeLifeCycle {
    const registry = {
      Create,
    }

    const defaults = registry[node.type as 'Create'] // !!

    return {
      ...defaults,
      ...node,
    }
  }
}

// new DiagramBuilder()
//   .addNode(CreateJson)
//   .addNode(Filter)
//   .addNode(Map)
//   .on(CreateJson, 'error')
//   .addNode(Terminate)

// new HeadlessDiagramBuilder()
//   .addNode(CreateJson)
//   .addNode(Filter)
//   .addNode(Map)
//   .on(CreateJson, 'error')
//   .addNode(Terminate)

const Computer = {
  async compute(diagram: any) {
    for(const node of diagram.nodes) {
      await node?.onBoot()
    }

    for(const node of diagram.nodes) {
      await node?.onCreateItems()
    }

    await diagram.run()

    // for(const node of diagram.nodesWithoutItems()) {
    //   await node?.onNoItems()
    // }    
    
    for(const node of diagram.nodes) {
      await node?.onSuccess()
    }

    for(const node of diagram.nodes) {
      await node?.onShutdown()
    }    
  }
}