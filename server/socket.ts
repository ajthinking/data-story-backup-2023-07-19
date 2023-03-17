import WebSocket from 'ws'
import { Server } from './Server'

const wsServer = new WebSocket.Server({
    port: 3100,
})

const server = new Server

wsServer.on("connection", function(ws) {
  ws.on("message", function(msg) {

    ws.send(
      JSON.stringify(server.describe())
    )
  })

  ws.on("close", function() {
      console.log("Client disconnected 😢")
  })

  ws.on("error", function(error) {
      console.log("Error 😱", error)
  })

  console.log("Client connected 💓")
})