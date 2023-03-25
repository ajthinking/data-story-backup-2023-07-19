export type ParamValue = any

export type Param = {
  id: string
  name: string
  type: string
  value?: ParamValue
  placeholder?: string,
  selectOptions?: string[],
}

export const name = {
  id: 'name',
  name: 'name',
  type: 'string',
  value: '',
}

export const label = {
  id: 'label',
  name: 'label',
  type: 'string',
  value: '',
}

export const DefaultParams = { name, label }