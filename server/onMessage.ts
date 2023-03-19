import WebSocket from 'ws';
import { describe, run } from "./commands"

export const onMessage = async (ws: WebSocket, msg: string) => {
  console.log("Got a message")
  const parsed = JSON.parse(msg.toString())
  const { type } = parsed

  if (type === "describe") return ws.send(describe().stringify());
  if (type === "run") return await run(ws, parsed);

  console.log("Reach end of onMessage")
}