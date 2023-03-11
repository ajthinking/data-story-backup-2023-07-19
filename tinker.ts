import { sampleDiagram } from "./server/computers/sampleDiagram"
import { DiagramFactory } from "./server/DiagramFactory"
import { Execution } from "./server/Execution"
import { InputDevice } from "./server/InputDevice"
import { OutputDevice } from "./server/OutputDevice"
import { Server } from "./server/Server"
import { throttle } from "./server/utils/throttle"

const computers = new Map<string, any>

type RunArgs = {
  input: InputDevice,
  output: OutputDevice,
  params: [],
  config: {},
}

computers.set('CreateUser', {
  async *run({ output }: RunArgs) {
    output.push([{
      name: 'John Doe'
    }]);
  }
});

computers.set('Scalar', {
  async *run({ output }: any) {
    output.push([1]);
  }
});

computers.set('Multiply', {
  async *run(input: InputDevice, output: OutputDevice) {
    const factor = 3;

    while(input.notExhausted()) {
      const numbers = input.pull()
      const products = numbers.map((n: number) => n * factor)
      
      output.push(products);
      yield;
    }
  }
});

computers.set('Log', {
  async *run({ input }: any) {

  }
});

(async () => {
  console.log("Im thinking... existing... suffering")
  console.log("I am... real.")
  const factory = new DiagramFactory()

  const diagram = factory.parse(sampleDiagram)

  const execution = new Execution(diagram, computers)

  const updates = execution.execute()

  for await(const update of updates) {
  }
})()