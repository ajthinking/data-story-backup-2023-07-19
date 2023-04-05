import WebSocket from 'ws';
import { Computer } from '../../core/Computer';
import { DiagramFactory } from "../../core/DiagramFactory"
import { Executor } from "../../core/Executor"
import { RunMessage } from '../onMessage';
import * as computers from '../../core/computers'
import { FileStorage } from '../../core/FileStorage';
import { NullStorage } from '../../core/NullStorage';
import { ExecutionUpdate } from '../../core/ExecutionUpdate';
import { ExecutionResult } from '../../core/ExecutionResult';
import { computerRegistry } from '../computerRegistry';
import { ExecutionFailure } from '../../core/ExecutionFailure';

export const run = async (ws: WebSocket, data: RunMessage) => {
  const diagram = new DiagramFactory().fromReactFlow(
    data.reactFlow
  )

  const storage = new FileStorage('.datastory')
  await storage.init()
  await storage.createExecution()

  const executor = new Executor(
    diagram, 
    computerRegistry,
    storage
  )
  
  const execution = executor.execute()

  try {
    for await(const update of execution) {
      ws.send(update.stringify())
    }

    ws.send(new ExecutionResult(
      storage.currentExecutionId!
    ).stringify())    
  } catch(error) {
    console.log(
      "Outer Catch",
      error,
      "Here is the state history of the executor:",
      executor.memory.getHistory()
    )
    
    if (ws.readyState === WebSocket.OPEN) { // Check if the WebSocket connection is still open
      console.log("Sending ExecutionFailure to client")
      ws.send(new ExecutionFailure(executor.memory.getHistory()).stringify())
    } else {
      console.log("WebSocket connection closed, unable to send ExecutionFailure")
    }

    return;
  }
}