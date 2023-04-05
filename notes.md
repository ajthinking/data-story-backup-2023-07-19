import WebSocket from 'ws';

export const run = async (ws: WebSocket) => {
  const executor = new Executor()
  
  const execution = executor.execute()

  try {
    for await(const update of execution) {
      ws.send(update.stringify())
    }
  } catch(error) {
    console.log("We catched it!")
  }
}