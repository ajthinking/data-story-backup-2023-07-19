export class ServerClient {
  constructor(private socket: any) {}

  ping() {
    this.socket.send("ping");
  }

  describe() {
    this.socket.send("describe");
  }

  run() {
    this.socket.send("run");
  }
}