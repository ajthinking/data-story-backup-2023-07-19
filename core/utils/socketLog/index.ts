// Client-side
import net from 'net';

const port = 3010

export const socketLog = (message: string) => {
  const client = new net.Socket();
  
  client.connect(port, '127.0.0.1', function() {
    client.write(message);
    client.end()
  });
}