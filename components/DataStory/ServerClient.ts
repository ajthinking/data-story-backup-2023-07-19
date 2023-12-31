import { SerializedReactFlow } from '../../core/types/SerializedReactFlow';

export interface ServerClient {
  init: () => void;
  describe: () => void;
  run: (reactFlow: SerializedReactFlow) => void;
  open: (name: string) => void;
  save: (name: string, reactFlow: SerializedReactFlow) => {}
}