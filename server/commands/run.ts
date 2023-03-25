import WebSocket from 'ws';
import { Computer } from '../../core/Computer';
import { DiagramFactory } from "../../core/DiagramFactory"
import { Executor } from "../../core/Executor"
import { RunMessage } from '../onMessage';
import * as computers from '../../core/computers'
import { FileStorage } from '../../core/FileStorage';
import { NullStorage } from '../../core/NullStorage';

export const run = async (ws: WebSocket, data: RunMessage) => {
  const diagram = new DiagramFactory().fromReactFlow(
    data.reactFlow
  )

  const computerRegistry = new Map<string, Computer>()

  for(const factory of Object.values(computers)) {
    const instance = factory()
    computerRegistry.set(instance.name, instance)
  }

  const storage = new NullStorage()

  const executor = new Executor(
    diagram, 
    computerRegistry,
    storage
  )
  
  const execution = executor.execute()

  for await(const update of execution) {
    ws.send(update.stringify())
  }
}