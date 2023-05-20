import * as computerConfigFactories from '../core/computers'
import { Computer } from '../core/types/Computer';
import { ComputerFactory } from '../core/ComputerFactory';
import { NodeDescriptionFactory } from './NodeDescriptionFactory';

/**
 * The internal registry of all computers
 */
const computers = (() => {
  const map = new Map<string, Computer>()

  for(const configFactory of Object.values(computerConfigFactories)) {
    const config = configFactory()
    const computer = ComputerFactory.fromComputerConfig(config)
    
    map.set(computer.name, computer)
  }
  
  return map
})()

/**
 * The public registry of all computers
 */
export const ComputerRegistry = {
  all() {
    return computers
  },

  descriptions() {
    return Array.from(computers.values()).map(computer => {
      return NodeDescriptionFactory.fromComputer(computer)
    })
  }
}