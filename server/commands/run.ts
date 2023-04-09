import WebSocket from 'ws';
import { DiagramFactory } from "../../core/DiagramFactory"
import { Executor } from "../../core/Executor"
import { RunMessage } from '../onMessage';
import { FileStorage } from '../../core/FileStorage';
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
    if (ws.readyState === WebSocket.OPEN) {
      console.log("Sending ExecutionFailure to client")
      ws.send(new ExecutionFailure(executor.memory.getHistory()).stringify())
    } else {
      console.log("WebSocket connection closed, unable to send ExecutionFailure")
    }

    return;
  }
}