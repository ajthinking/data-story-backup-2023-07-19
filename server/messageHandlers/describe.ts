import * as computers from '../../core/computers';
import { Message } from '../Message';
import { MessageHandler } from '../MessageHandler';
import { NodeDescription } from '../NodeDescription';
import { DescribeMessage } from '../messages/DescribeMessage';
import WebSocket from 'ws';

export const describe: MessageHandler<DescribeMessage> = async (
  ws: WebSocket,
  data: DescribeMessage
) => {
  const nodeDescriptions: NodeDescription[] = Object.values(computers).map((computer) => { 
    const instance = computer()
    
    return {
      name: instance.name,
      label: instance.label,
      category: instance.category,
      inputs: instance.inputs || [],
      outputs: instance.outputs ||  [],
      params: instance.params || {},
      tags: instance.tags || [],
    }
  })

  const response = {
    type: 'DescribeResponse',
    availableNodes: nodeDescriptions,
  }

  ws.send(JSON.stringify(response))
}