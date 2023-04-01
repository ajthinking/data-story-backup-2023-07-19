import { DataStory } from './../../components/DataStory';
import { Ignore, Signal, Sleep } from "../../core/computers";
import { DiagramBuilder } from "../../core/DiagramBuilder";

export default function Async() {
  // We cant do this here! We are in JS land, not Node land.
  // That means required node libs like fs are not available.
  // const diagram = new DiagramBuilder()
  //   .add(Signal)
  //   .add(Sleep)
  //   .add(Ignore)
  //   .get()

  return (
    <DataStory />
  )
}
    