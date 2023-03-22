import WebSocket from 'ws';
import { describe, run } from "./commands"

export type RunMessage = {
  type: "run"
  reactFlow: any
}

const isRun = (parsed: Object): parsed is RunMessage => {
  return (parsed as RunMessage).type === "run"
}

export const onMessage = async (ws: WebSocket, msg: string) => {
  console.log("Got a message")
  const parsed = JSON.parse(msg.toString())
  const { type } = parsed

  if (type === "describe") return ws.send(describe().stringify());
  if (isRun(parsed)) return await run(ws, parsed);

  console.log(parsed)
  throw("Unknown message type: " + type)
}