import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { ObjectItemValue } from "../../ItemValue";
import { DefaultParams } from "../../Param";
import { json, string } from "../../ParamBuilder";
import { hubspot } from "./hubspot";

const getBasicApi = (entity: string) => {
  if(entity === 'contacts') return hubspot.crm.contacts.basicApi;
  if(entity === 'companies') return hubspot.crm.companies.basicApi;
  if(entity === 'deals') return hubspot.crm.deals.basicApi;
  if(entity === 'tickets') return hubspot.crm.tickets.basicApi;
  if(entity === 'lineItems') return hubspot.crm.lineItems.basicApi;
  if(entity === 'products') return hubspot.crm.products.basicApi;

  throw new Error(`Unsupported entity: ${entity}`)
}

export const UpdateEntity: ComputerFactory = (): Computer => ({
  name: 'UpdateEntity',
  inputs: ['input'],
  outputs: ['updated', 'errors'],
  params: {
    ...DefaultParams,
    entity: string('entity').value('companies').get(),
    properties: json('properties').value('["name"]').get(),
  },
  tags: ['Abstract'],
  category: 'HubSpot',  

  async *run({ input, output, params }) {
    const entity = params.entity as string    
    const api = getBasicApi(entity)
    const properties = JSON.parse(params.properties)
    
    while(true) {
      const incoming = input.pull() as ObjectItemValue[]

      for(const item of incoming) {
        try {
          const result = await api.update(item.id, properties)
          output.pushTo('updated', [result])
          yield;
        } catch(e) {
          output.pushTo('errors', ['Could not update entity'])
          yield;
        }
      }
    }
  },
});
