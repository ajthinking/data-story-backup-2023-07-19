import { when } from "../../support/computerTester/ComputerTester";
import { Pluck } from "./Pluck";

it('plucks a property from objects', async () => {
  await when(Pluck)
    .hasParams({
      property: 'name',
    })
    .getsInput([{ name: 'aj' }, { name: 'mw' }])
    .doRun()
    .expectOutput(['aj', 'mw'])
    .ok()
})
