import { SerializedReactFlow } from "../../components/Workbench/SerializedReactFlow"

export type SaveMessage = {
  type: "save"
  name: string
  reactFlow: SerializedReactFlow
}