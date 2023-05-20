import { when } from '../../support/computerTester/ComputerTester';
import { RunCommand } from './RunCommand';

it.todo('does something', async () => {
  await when(RunCommand)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1, 2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([1, 2, 3, 4])
    .ok()
})
