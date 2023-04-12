import WebSocket from 'ws';
import { describe, run } from "./commands"
import { SerializedReactFlow } from '../components/Workbench/SerializedReactFlow';

export type RunMessage = {
  type: "run"
  reactFlow: SerializedReactFlow
}

export type DescribeMessage = {
  type: "describe"
}

const isRun = (parsed: Object): parsed is RunMessage => {
  return (parsed as RunMessage).type === "run"
}

const isDescribe = (parsed: Object): parsed is DescribeMessage => {
  return (parsed as DescribeMessage).type === "describe"
}

export const onMessage = async (ws: WebSocket, msg: string) => {
  const parsed = JSON.parse(msg.toString())

  if (isDescribe(parsed)) return ws.send(describe().stringify());
  if (isRun(parsed)) return await run(ws, parsed);

  throw("Unknown message type: " + parsed.type)
}