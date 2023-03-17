import { PortId } from "./Port";

export type LinkId = string
export class Link {
  constructor(
    public id: LinkId,
    public sourcePortId: PortId,
    public targetPortId: PortId,
  ) {}
}
