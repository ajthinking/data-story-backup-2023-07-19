import { Computer } from "../core/Computer";
import { NodeDescription } from "./NodeDescription";

export const NodeDescriptionFactory = {
  fromComputer: (computer: Computer): NodeDescription => {
    return {
      name: computer.name,
      label: computer.label,
      category: computer.category,
      inputs: computer.inputs.map(input => input.name),
      outputs: computer.outputs.map(output => output.name),
      params: computer.params,
      tags: computer.tags,
      inputSchemas: Object.entries(computer.inputs).reduce((acc, [key, value]) => {
        acc[key] = value.schema;
        return acc;
      }, {} as any),
      outputSchemas: Object.entries(computer.outputs).reduce((acc, [key, value]) => {
        acc[key] = value.schema;
        return acc;
      }, {} as any),
    }
  }
}