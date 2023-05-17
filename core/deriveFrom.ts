import { ComputerConfigFactory } from "./types/Computer";
import { ParamValue } from "./Param";

export type DeriveFromOptions = {
  name: string,
  label?: string,
  category?: string,
  params: Record<string, ParamValue>,
  tags?: string[],
}

export const deriveFrom = (
  computerFactory: ComputerConfigFactory,
  options: Record<string, ParamValue>
) => {
  return () => {
    const template = computerFactory();
    template.name = options.name;

    template.tags = [
      ...(template.tags || []),
      ...(options.tags || []),
    ]

    template.category = options.category || template.category
    template.label = options.label || template.label

    // TODO is this nasty?
    if(!template.params) template.params = {}
  
    for (const [paramName, paramValue] of Object.entries(options.params || {})) {
      template.params[paramName].value = paramValue
    }
  
    return template
  }
}