import { expect, it } from "vitest"
import { NodeDescription } from "../../../server/commands/describe"
import { guessPosition } from "./guessPosition"

it('places first nodes at 75, 50', () => {
  const nodes: any = []
  const nodeDescription = {
    inputs: [] as string[]
  } as NodeDescription

  const position = guessPosition(nodes, nodeDescription)
  expect(position).toEqual({ x: 75, y: 50 })
})

it('places subsequent nodes with inputs to the right', () => {
  const nodes: any = [
    { position: { x: 75, y: 50 } }
  ]

  const nodeDescription = { inputs: ['input'] } as NodeDescription
  const position = guessPosition(nodes, nodeDescription)

  expect(position).toEqual({ x: 275, y: 50 })
})

it('places subsequent starter nodes below maximum y', () => {
  const nodes: any = [
    { position: { x: 75, y: 1337 } }
  ]

  const nodeDescription = {
    inputs: [] as string[]
  } as NodeDescription
   
  const position = guessPosition(nodes, nodeDescription)

  expect(position).toEqual({ x: 75, y: 1337 + 100 })
})