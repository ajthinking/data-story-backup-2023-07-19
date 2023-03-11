import { describe, expect, it } from "vitest";
import { Link } from "./computers/Link";
import { Diagram } from "./Diagram";
import { Port } from "./Port";

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