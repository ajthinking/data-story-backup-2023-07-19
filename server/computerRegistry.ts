import { Computer } from "../core/Computer";
import { Ignore, Pass, Signal } from "../core/computers";

export const computerRegistry = new Map<string, Computer>()
  .set('Signal', Signal())
  .set('Pass', Pass())
  .set('Ignore', Ignore())