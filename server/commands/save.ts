import WebSocket from 'ws';
import { RunMessage, SaveMessage } from '../onMessage';
import { FileStorage } from '../../core/FileStorage';

export const save = async (ws: WebSocket, data: SaveMessage) => {
  const storage = new FileStorage('.datastory')
  await storage.init()

  console.log("SAVE WAS CALLED!", data.name, data.reactFlow)
}