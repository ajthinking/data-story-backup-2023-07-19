import { when } from '../../support/computerTester/ComputerTester';
import { Output } from './Output';

it.todo('todo', async () => {
  await when(Output)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1, 2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([1, 2, 3, 4])
    .ok()
})