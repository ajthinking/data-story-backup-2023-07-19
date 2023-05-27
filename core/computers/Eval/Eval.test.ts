import { when } from '../../support/computerTester/ComputerTester';
import { Eval } from './Eval';

it('can pass js to be evaluated', async () => {
  process.env.USE_UNSAFE_EVAL = 'true'

  await when(Eval)
    .hasParams({
      js: "item.value.y = 2 * item.value.x"
    })
    .getsInput([{x: 1}])
    .doRun()
    .expectOutput([{x: 1, y: 2}])
    .ok()
  
  process.env.USE_UNSAFE_EVAL = undefined
})

it('will throw if USE_UNSAFE_EVAL is not set', async () => {
  await when(Eval)
  .hasParams({
    js: "evil code!"
  })
  .getsInput([{x: 'blue eyes'}])
  .expectError('Unsafe eval is disabled. If you really want to do this, set USE_UNSAFE_EVAL=true in your .env file.')
  .doRun()
  .ok()
})
