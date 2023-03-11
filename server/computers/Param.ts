export type ParamType = 'js' | 'json' | 'string' | 'number' | 'boolean' | 'object' | 'array' | 'function' | 'null' | 'undefined'

export type Param = {
  name: string
  options?: ParamType[],
  value: string | null,
}