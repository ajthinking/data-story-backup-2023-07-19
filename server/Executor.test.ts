import { describe, expect, it } from "vitest";
import { Node } from "./Node";
import { Diagram } from "./Diagram";
import { Executor } from "./Executor";
import { Computer, RunArgs } from "./Computer";
import { Link, LinkId } from "./Link";
import { DiagramBuilder } from "./DiagramBuilder";
import { CreateJson } from "./computers";
import { ExecutionResult } from "./ExecutionResult";

describe('execute', () => {
  it('can execute an empty diagram', async () => {
    const diagram = new Diagram([], [])
    const computers = new Map<string, Computer>()

    const executor = new Executor(diagram, computers)

    const updates = executor.execute()

    const result = await updates.next()

    expect(result.done).toBe(true)
  })

  it('returns an execution result with link counts', async () => {
    const diagram = new Diagram([], [])
    const computers = new Map<string, Computer>()

    const executor = new Executor(diagram, computers)

    const updates = executor.execute()

    const result = await updates.next()

    expect(result.value).toBeInstanceOf(ExecutionResult)
    expect(result.value.linkCounts).toBeInstanceOf(Map<LinkId, number>)
  })  

  it('can execute a diagram with a single no-input no-output node', async () => {
    const node = new Node({
      id: 'node-id',
      type: 'Dummy',
      inputs: [],
      outputs: [],
    })

    const diagram = new Diagram([node], [])

    let proof = 'dummy-should-change-this'

    const computers = new Map<string, Computer>().set('Dummy', {
      async *run({}) {
        proof = 'dummy-rocks'
      },
    } as Computer)

    const executor = new Executor(diagram, computers)

    const updates = executor.execute()
    const update1 = await updates.next()

    expect(update1.done).toBe(false)
    expect(proof).toBe('dummy-rocks')

    const update2 = await updates.next()
    expect(update2.done).toBe(true)
  })

  it('can execute a diagram with non connected input node', async () => {
    const node = new Node({
      id: 'node-id',
      type: 'Accepter',
      inputs: [{
          id: 'input-id',
          name: 'input',
      }],
      outputs: [],
    })

    const diagram = new Diagram([node], [])

    const computers = new Map<string, Computer>().set('Accepter', {
      async *run({ output }) {
        // do nothing
      },
    } as Computer)

    const executor = new Executor(diagram, computers)

    const updates = executor.execute()
    const result = await updates.next()

    expect(result.done).toBe(true)
  })    

  it('can execute a diagram with a node outputting items', async () => {
    const node = new Node({
      id: 'zergling-spawner-id',
      type: 'Spawner',
      inputs: [],
      outputs: [
        {
          id: 'zergling-output-id',
          name: 'output',
        }
      ],
    })

    const diagram = new Diagram([node], [])

    const computers = new Map<string, Computer>().set('Spawner', {
      async *run({ output }) {
        output.push([{ type: 'Zergling' }])
      },
    } as Computer)

    const executor = new Executor(diagram, computers)

    const updates = executor.execute()

    const update1 = await updates.next()
    expect(update1.done).toBe(false)

    const update2 = await updates.next()
    expect(update2.done).toBe(true)
  })

  it('can execute a diagram with item flowing between two nodes', async () => {
    const create = new Node({ 
      id: 'create-id',
      type: 'Create',
      inputs: [],
      outputs: [{
        id: 'Create.1.output',
        name: 'output',
      }],
    })

    const log = new Node({
      id: 'log-id',
      type: 'Log',
      inputs: [{
        id: 'Log.1.input',
        name: 'input',
      }],
      outputs: [],
    })
    
    const link = new Link('link-id', 'Create.1.output', 'Log.1.input')

    const diagram = new Diagram([create, log], [link])

    // track order of execution
    const order: string[] = []

    const createComputer = {
      name: 'Create',
      async *run({ output }: RunArgs) {
        order.push('running create')
        output.push([1])
      },
    }

    const logComputer = {
      name: 'Log',
      async *run({ input }: RunArgs) {
        // console.log ... or something
        
        order.push('running log')
        const items = input.pull()
      },
    }

    const computers = new Map<string, Computer>()
      .set(createComputer.name, createComputer)
      .set(logComputer.name, logComputer)
    
    const executor = new Executor(diagram, computers)

    const updates = executor.execute()

    const update1 = await updates.next()
    expect(update1.done).toBe(false)
    expect(order).toMatchObject(['running create'])

    const update2 = await updates.next()
    expect(update2.done).toBe(false)
    expect(order).toMatchObject(['running create', 'running log',])

    const update3 = await updates.next()
    expect(update3.done).toBe(true)
    expect(order).toMatchObject(['running create', 'running log',])
  })
})