// Server-side
import net from 'net';

const port = 3010

export const socketLogServer = () => {
  const server = net.createServer((socket) => {
    socket.on('data', (data) => {
      console.log(data.toString());
    });
  });

  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

socketLogServer()