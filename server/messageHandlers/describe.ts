import * as computers from '../../core/computers';
import { Message } from '../Message';
import { MessageHandler } from '../MessageHandler';
import { NodeDescription } from '../../core/NodeDescription';
import { ComputerRegistry } from '../../core/computerRegistry';
import { DescribeMessage } from '../messages/DescribeMessage';
import WebSocket from 'ws';

export const describe: MessageHandler<DescribeMessage> = async (
  ws: WebSocket,
  data: DescribeMessage
) => {
  const response = {
    type: 'DescribeResponse',
    availableNodes: ComputerRegistry.descriptions(),
  }

  ws.send(JSON.stringify(response))
}