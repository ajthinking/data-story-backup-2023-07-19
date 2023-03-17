export class ServerClient {
  constructor(private socket: any) {}

  ping() {
    this.socket.send("ping");
  }

  availableNodes() {
    this.socket.send("availableNodes");
  }

  run() {
    this.socket.send("run");
  }
}