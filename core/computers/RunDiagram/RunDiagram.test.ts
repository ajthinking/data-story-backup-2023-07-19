import { when } from '../../support/computerTester/ComputerTester';
import { RunDiagram } from './RunDiagram';

it('does something', async () => {
  await when(RunDiagram)
    .hasDefaultParams()
    .getsInput([1])
    .doRun()
    .ok()
})
