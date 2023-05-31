import { when } from '../../support/computerTester/ComputerTester';
import { Input } from './Input';

it.todo('todo', async () => {
  await when(Input)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1, 2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([1, 2, 3, 4])
    .ok()
})