import { Computer } from '../core/types/Computer';
import { NodeDescription } from './NodeDescription';

export const NodeDescriptionFactory = {
  fromComputer: (computer: Computer): NodeDescription => {
    return {
      name: computer.name,
      label: computer.label,
      category: computer.category,
      inputs: computer.inputs,
      outputs: computer.outputs,
      params: computer.params,
      tags: computer.tags,
    }
  }
}