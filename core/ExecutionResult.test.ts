import { describe, expect, it } from "vitest"
import { ExecutionResult } from "./ExecutionResult"

describe('stringify', () => {
  it('should stringify', () => {
    const result = new ExecutionResult()
    expect(result.stringify()).toEqual('{"type":"executionResult"}')
  })
})