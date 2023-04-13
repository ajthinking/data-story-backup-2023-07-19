import WebSocket from 'ws';
import { describe, run } from "./commands"
import { SerializedReactFlow } from '../components/Workbench/SerializedReactFlow';
import { save } from './commands/save';

export type RunMessage = {
  type: "run"
  reactFlow: SerializedReactFlow
}

export type DescribeMessage = {
  type: "describe"
}

export type SaveMessage = {
  type: "save"
  name: string
  reactFlow: SerializedReactFlow
}

const isRun = (parsed: Object): parsed is RunMessage => {
  return (parsed as RunMessage).type === "run"
}

const isDescribe = (parsed: Object): parsed is DescribeMessage => {
  return (parsed as DescribeMessage).type === "describe"
}

const isSave = (parsed: Object): parsed is SaveMessage => {
  return (parsed as SaveMessage).type === "save"
}

export const onMessage = async (ws: WebSocket, msg: string) => {
  const parsed = JSON.parse(msg.toString())

  if (isDescribe(parsed)) return ws.send(describe().stringify());
  if (isRun(parsed)) return await run(ws, parsed);
  if (isSave(parsed)) return await save(ws, parsed);

  throw("Unknown message type: " + parsed.type)
}