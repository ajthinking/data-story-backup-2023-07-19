export interface ServerClient {
  init: () => void;
  describe: () => void;
  run: (reactFlow: any) => void;
}