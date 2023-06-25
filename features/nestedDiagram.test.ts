import { DiagramBuilder } from "../core/DiagramBuilder"
import { Executor } from "../core/Executor"
import { NullStorage } from "../core/NullStorage"
import { CreateJson, Ignore, RunDiagram } from "../core/computers"
import { ComputerRegistry } from "../server/computerRegistry"

it('can execute nested diagrams', async () => {
  // const diagram = new DiagramBuilder()
  //   .add(CreateJson)
  //   .add(RunDiagram)
  //   .add(Ignore)
  //   .get()
  
  // const executor = new Executor(
  //   diagram,
  //   ComputerRegistry.all(),
  //   new NullStorage()
  // )

  // const execution = executor.execute()

  // for await (const update of execution);
})