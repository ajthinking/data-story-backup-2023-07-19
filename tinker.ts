import { DiagramBuilder } from "./core/DiagramBuilder";
import { CreateAttribute, Signal } from "./core/computers";

export {}

(async () => {
  const diagram = new DiagramBuilder()
    .add(Signal, { period: 1000, count: 10 })
    .add(CreateAttribute, { key: 'name', value: 'John' })
    .get()

  console.log(diagram)
})();

/*
Diagram {
  nodes: [
    {
      id: 'Signal.1',
      type: 'Signal',
      inputs: [],
      outputs: [Array],
      params: [Object]
    },
    {
      id: 'CreateAttribute.1',
      type: 'CreateAttribute',
      inputs: [Array],
      outputs: [Array],
      params: [Object]
    }
  ],
  links: [
    {
      id: 'Signal.1.output--->CreateAttribute.1.input',
      sourcePortId: 'Signal.1.output',
      targetPortId: 'CreateAttribute.1.input'
    }
  ]
}
*/