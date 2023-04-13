import { SerializedReactFlow } from "./SerializedReactFlow";

export interface ServerClient {
  init: () => void;
  describe: () => void;
  run: (reactFlow: SerializedReactFlow) => void;
  save: (name: string, reactFlow: SerializedReactFlow) => {}
}