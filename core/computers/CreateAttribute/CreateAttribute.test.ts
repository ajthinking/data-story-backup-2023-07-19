import { when } from "../../support/computerTester/ComputerTester";
import { CreateAttribute } from "./CreateAttribute";

it('adds an attribute to objects', async () => {
  await when(CreateAttribute)
    .hasParams({
      key: "prio",
      value: "zero"
    })
    .getsInput([{}])
    .doRun()
    .expectOutput([{
      prio: "zero"
    }])
    .ok()
})
