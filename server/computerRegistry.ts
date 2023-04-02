import * as computers from '../core/computers'
import { Computer } from "../core/Computer";

const registry = new Map<string, Computer>()

for(const factory of Object.values(computers)) {
  const instance = factory()
  registry.set(instance.name, instance)
}

export const computerRegistry = registry;