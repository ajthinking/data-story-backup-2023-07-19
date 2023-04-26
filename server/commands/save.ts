import WebSocket from 'ws';
import { RunMessage, SaveMessage } from '../onMessage';
import { FileStorage } from '../../core/FileStorage';

export const save = async (ws: WebSocket, data: SaveMessage) => {
  const storage = new FileStorage('.datastory')
  await storage.init()

  await storage.put(
    data.name,
    JSON.stringify(data.reactFlow, null, 2)
  )
}