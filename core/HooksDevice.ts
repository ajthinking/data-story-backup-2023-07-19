import { Hook } from "./types/Hook"

export type HooksDevice = {
  register: (hook: Hook) => void
}