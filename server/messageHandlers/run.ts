import WebSocket from 'ws';
import { DiagramFactory } from "../../core/DiagramFactory"
import { Executor } from "../../core/Executor"
import { RunMessage } from '../messages/RunMessage';
import { FileStorage } from '../../core/FileStorage';
import { ExecutionResult } from '../../core/ExecutionResult';
import { ComputerRegistry } from '../computerRegistry';
import { ExecutionFailure } from '../../core/ExecutionFailure';
import { MessageHandler } from '../MessageHandler';

export const run: MessageHandler<RunMessage> = async (ws: WebSocket, data: RunMessage) => {
  const diagram = new DiagramFactory().fromReactFlow(
    data.reactFlow
  )

  const storage = new FileStorage('.datastory')
  await storage.init()
  await storage.createExecution()

  const executor = new Executor(
    diagram, 
    ComputerRegistry.all(),
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
      console.log(error)
      ws.send(new ExecutionFailure(executor.memory.getHistory()).stringify())
    } else {
      console.log("WebSocket connection closed, unable to send ExecutionFailure")
    }

    return;
  }
}