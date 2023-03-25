import { ComputerFactory } from "./Computer";
import { ParamValue } from "./Param";

export type DeriveFromOptions = {
  name: string,
  params: Record<string, ParamValue>,
  tags?: string[],
}

export const deriveFrom = (
  computerFactory: ComputerFactory,
  options: Record<string, ParamValue>
) => {
  return () => {
    const template = computerFactory();
    template.name = options.name;

    template.tags = [
      ...(template.tags || []),
      ...(options.tags || []),
    ]

    // TODO is this nasty?
    if(!template.params) template.params = {}
  
    for (const [paramName, paramValue] of Object.entries(options.params || {})) {
      template.params[paramName].value = paramValue
    }
  
    return template
  }
}