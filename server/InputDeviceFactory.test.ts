import { describe, expect, it } from "vitest"
import { CreateJson, Pass } from "./computers";
import { DiagramBuilder } from "./DiagramBuilder";
import { InputDevice } from "./InputDevice";
import { InputDeviceFactory } from "./InputDeviceFactory";

describe('create', () => {
  it('creates a device from a node and diagram', () => {
    const diagram = new DiagramBuilder()
      .add(CreateJson)
      .add(Pass)
      .get()
    
    const node = diagram.nodes.find(node => node.type === 'Pass')!

    const device = InputDeviceFactory.create(node, diagram);

    expect(device).toBeInstanceOf(InputDevice)
  })

  it('creates a device from a single node diagram', () => {
    const diagram = new DiagramBuilder()
      .add(Pass)
      .get()
    
    const node = diagram.nodes.find(node => node.type === 'Pass')!

    const device = InputDeviceFactory.create(node, diagram);

    expect(device).toBeInstanceOf(InputDevice)
  })  
})