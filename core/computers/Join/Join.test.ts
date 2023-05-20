import { when } from '../../support/computerTester/ComputerTester';
import { Join } from './Join';

it('joins using comma by default', async () => {
  await when(Join)
    .hasDefaultParams()
    .getsInput([1, 2])
    .doRun()
    .expectOutput(['1,2'])
    .ok()
})

it('can join using a custom separator', async () => {
  await when(Join)
    .hasParams({
      separator: '-',
    })
    .getsInput([1, 2])
    .doRun()
    .expectOutput(['1-2'])
    .ok()
})
