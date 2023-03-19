import { Computer } from "../core/Computer";
import { Pass, Signal } from "../core/computers";

export const computerRegistry = new Map<string, Computer>()
  .set('Signal', Signal)
  .set('Pass', Pass)
