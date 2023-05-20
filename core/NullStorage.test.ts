import { NullStorage } from './NullStorage'

describe('init', () => {
  it('can run', async () => {
    const storage = new NullStorage()

    await storage.init()
  })
})

describe('createExecution', () => {
  it('can run', async () => {
    const storage = new NullStorage()

    await storage.createExecution()
  })
})

describe('putExecutionItems', () => {
  it('can run', async () => {
    const storage = new NullStorage()

    await storage.putExecutionItems('dummy', [1,2,3])
  })
})