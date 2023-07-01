import { DiagramBuilder } from "./core/DiagramBuilder";
import { Executor } from "./core/Executor";
import { NullStorage } from "./core/NullStorage";
import { ConsoleLog, CreateAttribute, CreateJson, RunDiagram, Signal } from "./core/computers";
import { ComputerRegistry } from "./server/computerRegistry";

export {}

(async () => {
  // const diagram = new DiagramBuilder()
  //   .add(CreateJson)
  //   .add(RunDiagram)
  //   .add(ConsoleLog, { message: 'Fouuyooo!' })
  //   .get()
  
  // const executor = new Executor(
  //   diagram,
  //   ComputerRegistry.all(),
  //   new NullStorage()
  // )

  // const execution = executor.execute()

  // for await (const update of execution);
})();