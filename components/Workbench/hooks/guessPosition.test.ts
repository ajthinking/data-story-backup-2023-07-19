import { expect, it } from 'vitest'
import { NodeDescription } from '../../../server/NodeDescription'
import { DataStoryNode } from '../../Node/DataStoryNode'
import { guessPosition } from './guessPosition'

it('places first nodes at 75, 50', () => {
  const nodes: DataStoryNode[] = []
  const nodeDescription = {
    inputs: [] as string[]
  } as NodeDescription

  const position = guessPosition(nodes, nodeDescription)
  expect(position).toEqual({ x: 75, y: 50 })
})

it('places subsequent nodes with inputs to the right', () => {
  const nodes = [
    { position: { x: 75, y: 50 } }
  ] as DataStoryNode[]

  const nodeDescription = { inputs: ['input'] } as NodeDescription
  const position = guessPosition(nodes, nodeDescription)

  expect(position).toEqual({ x: 275, y: 50 })
})

it('places subsequent starter nodes below maximum y', () => {
  const nodes = [
    { position: { x: 75, y: 1337 } }
  ] as DataStoryNode[]

  const nodeDescription = {
    inputs: [] as string[]
  } as NodeDescription

  const position = guessPosition(nodes, nodeDescription)

  expect(position).toEqual({ x: 75, y: 1337 + 200 })
})