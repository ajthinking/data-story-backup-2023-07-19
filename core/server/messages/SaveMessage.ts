import { SerializedReactFlow } from '../../components/DataStory/SerializedReactFlow'

export type SaveMessage = {
  type: "save"
  name: string
  reactFlow: SerializedReactFlow
}