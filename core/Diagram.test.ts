import { Link } from "./Link";
import { Diagram } from "./Diagram";
import { Port } from "./Port";
import { Node } from "./Node";

describe('linksConnectedToPortId', () => {
  it('returns links connected to port', () => {
    const port = new Port('port-id', 'My Port')
    const link = new Link(
      'link-id',
      'source-port-id',
      'port-id'
    )

    const diagram = new Diagram([], [link])
    const result = diagram.linksConnectedToPortId(port.id)
    expect(result).toMatchObject([link])
  })
})

describe('nodeWithOutputPortId', () => {
  it('returns the node given a output port id', () => {
    const output = new Port('output-port-id', 'output')

    const node = new Node({
      id: 'node-id',
      type: 'MyNode',  
      inputs: [],
      outputs: [output],
    })

    const diagram = new Diagram([node], [])
    const result = diagram.nodeWithOutputPortId('output-port-id')
    
    expect(result).toMatchObject(node)
  })

  it('returns undefined if it could not find a matching node', () => {
    const diagram = new Diagram([], [])
    const result = diagram.nodeWithOutputPortId('bad-id')
    
    expect(result).toBe(undefined)
  })  
})