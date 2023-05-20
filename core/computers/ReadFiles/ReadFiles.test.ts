import { when } from '../../support/computerTester/ComputerTester';
import { ReadFiles } from './ReadFiles';

it.todo('does something', async () => {
  await when(ReadFiles)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput([1, 2])
    .getsInput([3, 4])
    .doRun()
    .expectOutput([1, 2, 3, 4])
    .ok()
})
