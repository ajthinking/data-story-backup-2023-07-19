import { Computer } from "../core/types/Computer";
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
      inputSchemas: computer.inputs.reduce((acc, inputSchema) => {
        acc[inputSchema.name] = inputSchema.schema;
        return acc;
      }, {} as any),
      outputSchemas: computer.outputs.reduce((acc, outputSchema) => {
        acc[outputSchema.name] = outputSchema.schema;
        return acc;
      }, {} as any),
    }
  }
}