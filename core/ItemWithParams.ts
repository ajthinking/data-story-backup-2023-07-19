import { ItemValue, ObjectItemValue } from "./types/ItemValue";
import { ParamValue } from "./Param";

export class ItemWithParams<T = ItemValue> {
  type = 'ItemWithParams' as const
  value: T;
  params: Record<string, ParamValue>;

  constructor(value: T, params: Record<string, ParamValue>) {
    this.value = value;
    this.params = new Proxy({}, {
      get: (_, prop: string) => {
        const paramValue = params[prop];

        // We can only use params that exist
        if (!paramValue) return undefined;

        // We can only interpolate strings params
        if (typeof paramValue !== 'string') return paramValue;

        // We can only use object properties when interpolating
        if (typeof this.value !== 'object') return paramValue;

        /** Replace template strings with item properties
        * Example: { greeting: "Hi ${name}!"}
        * Becomes: { greeting: "Hi Bob!"}
        * When the item value is { name: "Bob" }
        */
        const value = paramValue.replace(/\${(\w+)}/g, (_: string, name: string) => {
          return (this.value as ObjectItemValue)[name];
        });

        return value;
      }
    });
  }
}