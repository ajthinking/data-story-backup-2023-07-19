import WebSocket from 'ws';
import { DiagramFactory } from "../../core/DiagramFactory"
import { Executor } from "../../core/Executor"
import { computerRegistry } from "../computerRegistry"

export const run = async (ws: WebSocket, data: any) => {
  const diagram = new DiagramFactory().fromReactFlow(
    data.reactFlow
  )

  const executor = new Executor(diagram, computerRegistry)
  
  const execution = executor.execute()

  for await(const update of execution) {
    ws.send(update.stringify())
    console.log("Sent update...", update)
  }
}