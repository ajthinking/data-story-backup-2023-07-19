import { when } from '../../support/computerTester/ComputerTester';
import { Filter } from './Filter';

it.todo('does something', async () => {
  await when(Filter)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1, 2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([1, 2, 3, 4])
    .ok()
})
