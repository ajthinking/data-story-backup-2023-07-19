import { when } from '../../support/computerTester/ComputerTester';
import { Log } from './Log';

it('logs on the server', async () => {
  const log = vi.spyOn(console, "log").mockImplementation(() => {});

  await when(Log)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .ok()
  
  expect(log).toHaveBeenCalledWith(JSON.stringify([1, 2], null, 2))
})
