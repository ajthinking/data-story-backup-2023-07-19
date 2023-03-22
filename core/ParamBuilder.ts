import { Param } from "./Param"

export const string = (id: string) => new ParamBuilder(id, 'string')
export const number = (id: string) => new ParamBuilder(id, 'number')
export const json = (id: string) => new ParamBuilder(id, 'json')

export class ParamBuilder {
  name: string

  constructor(private id: string, private type: string) {
    this.name = id
  }

  value(value: any): ParamBuilder {
    this.value = value

    return this
  }

  get(): Param {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      value: this.value,
    }
  }
}