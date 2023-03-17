export type Param = {
  id: string
  name: string
  type: string
  value: any
}

export const NameParam = {
  id: 'name',
  name: 'name',
  type: 'string',
  value: '',
}

export const LabelParam = {
  id: 'label',
  name: 'label',
  type: 'string',
  value: '',
}

export const DefaultParams = [NameParam, LabelParam]