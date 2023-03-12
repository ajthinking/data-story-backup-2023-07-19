import WebSocket from 'ws'

const wsServer = new WebSocket.Server({
    port: 3100,
})

wsServer.on("connection", function(ws) {
    ws.on("message", function(msg) {
        wsServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(msg.toString() + " from server");
            }
        })
    })
})