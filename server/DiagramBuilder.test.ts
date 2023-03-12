import { describe, expect, expectTypeOf, it } from "vitest";
import { Accept, CreateJson, Pass } from "./computers";
import { Diagram } from "./Diagram";
import { DiagramBuilder } from "./DiagramBuilder";


describe('get', () => {
  it('returns the diagram', () => {
    const diagram = new DiagramBuilder().get()

    expect(diagram).toBeInstanceOf(Diagram)
  })
})

describe('add', () => {
  it('adds a node to the diagram', () => {
    const diagram = new DiagramBuilder()
      .add(CreateJson)
      .add(Pass)
      .add(Accept)
      .get()
    
    /*
      ### Expect nodes
      * ids: CreateJson.1, Pass.1, Accept.1
      * types: CreateJson, Pass, Accept
      * inputs: [], ['input'], ['input']
      * outputs: ['output'], ['output'], []
      
      ### Expect links
      * CreateJson.1.output-->Pass.1.input
      * Pass.1.output-->Accept.1.input
    */

  })
})