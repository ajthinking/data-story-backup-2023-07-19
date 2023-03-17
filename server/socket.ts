import WebSocket from 'ws'

const wsServer = new WebSocket.Server({
    port: 3100,
})

wsServer.on("connection", function(ws) {
  ws.on("message", function(msg) {
    ws.send("Hello, you sent -> " + msg)
    console.log("GOT A MESSAGE", msg)
  })

  ws.on("close", function() {
      console.log("Client disconnected 😢")
  })

  ws.on("error", function(error) {
      console.log("Error 😱", error)
  })

  console.log("Client connected 💓")
})