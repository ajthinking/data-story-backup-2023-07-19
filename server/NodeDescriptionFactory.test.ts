import { Computer } from "../core/Computer"
import { ComputerConfig } from "../core/ComputerConfig"
import { ComputerFactory } from "../core/ComputerFactory"
import { DefaultParams } from "../core/Param"
import { NodeDescriptionFactory } from "./NodeDescriptionFactory"

describe('fromComputer', () => {
  it('returns a NodeDescription', () => {
    const config = {
      name: 'test',
      inputs: [{
        name: 'input1',
        schema: {},
      }],
    } as ComputerConfig

    const computer = ComputerFactory.fromComputerConfig(config)

    const nodeDescription = NodeDescriptionFactory.fromComputer(computer)

    expect(nodeDescription).toMatchObject({
      name: 'test',
      label: 'test',
      inputs: ['input1'],
      outputs: [],
      params: {
        ...DefaultParams
      },
      tags: [],
    })
  })
})