require('dotenv').config({ path: `.env.local` })
import WebSocket from 'ws'
import { onMessage } from './onMessage'
import { sleep } from '../core/utils/sleep'

const wsServer = new WebSocket.Server({
    port: 3100,
})

async function* asyncGenerator() {
  let unHandledError: Error | undefined;

  while(!unHandledError) {
    console.log("In while loop")
    const promise = new Promise((resolve, reject) => {
      console.log("In promise")
      reject(new Error('Some error without a handler😱'))
    })

    promise.catch((error: Error) => {
      // register the error
      unHandledError = error
      console.log("In catch?")
    })

    await sleep(1)
  }

  // here we should be back in "normal awaitable code"?
  // so we can throw to allow our global handler to pick it up?
  if(unHandledError) throw unHandledError
}

wsServer.on("connection", async (ws) => {
  console.log("Client connected 💓")

  const generator = asyncGenerator()

  try {
    for await (const value of generator) {
      console.log(value);
    }
  } catch {
    console.log("Catched! But why does it still kills the server??")
  }
})