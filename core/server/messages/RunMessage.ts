import { SerializedReactFlow } from '../../components/DataStory/SerializedReactFlow'

export type RunMessage = {
  type: "run"
  reactFlow: SerializedReactFlow
}