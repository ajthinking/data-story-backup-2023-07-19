import { DiagramBuilder } from "./core/DiagramBuilder";
import { Executor } from "./core/Executor";
import { NullStorage } from "./core/NullStorage";
import { ConsoleLog, CreateAttribute, CreateJson, RunDiagram, Signal } from "./core/computers";
import { ComputerRegistry } from "./core/computerRegistry";
import { promises as fs } from 'fs'
import { get } from '@data-story/core'

export {}

(async () => {
  const obj = {
    user: {
      name: {
        first: 'Anders'
      }
    }
  }

  console.log(
    get(obj, 'user.name.first')
  )
})();