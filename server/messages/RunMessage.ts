import { SerializedReactFlow } from '../../components/Workbench/SerializedReactFlow'

export type RunMessage = {
  type: "run"
  reactFlow: SerializedReactFlow
}