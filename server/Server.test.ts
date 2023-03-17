import { describe, expect, test } from "vitest"
import { Server } from './Server'

describe('describe', () => {
  test('returns available nodes', () => {
    const server = new Server()
    const result = server.describe()
    expect(result.availableNodes).toMatchObject([
      { name: 'CreateJson' },
      { name: 'Pass' },
      { name: 'Ignore' },
    ])
  })
})