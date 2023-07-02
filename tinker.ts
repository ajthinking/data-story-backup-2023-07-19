import { DiagramBuilder } from "./core/DiagramBuilder";
import { Executor } from "./core/Executor";
import { NullStorage } from "./core/NullStorage";
import { ConsoleLog, CreateAttribute, CreateJson, RunDiagram, Signal } from "./core/computers";
import { ComputerRegistry } from "./core/computerRegistry";
import { promises as fs } from 'fs'

export {}

(async () => {
  const path = __dirname + "/.datastory/flows"

  const flows = await fs.readdir(path)

  console.log(flows)
})();