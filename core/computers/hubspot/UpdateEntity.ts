import { Client } from "@hubspot/api-client";
import { Computer, ComputerFactory, RunArgs } from "../../Computer";
import { ObjectItemValue } from "../../ItemValue";
import { DefaultParams } from "../../Param";
import { json, string } from "../../ParamBuilder";

const ACCESS_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN

const client = new Client({
  accessToken: ACCESS_TOKEN,
  numberOfApiCallRetries: 3,
})

const getBasicApi = (entity: string) => {
  if(entity === 'contacts') return client.crm.contacts.basicApi;
  if(entity === 'companies') return client.crm.companies.basicApi;
  if(entity === 'deals') return client.crm.deals.basicApi;
  if(entity === 'tickets') return client.crm.tickets.basicApi;
  if(entity === 'lineItems') return client.crm.lineItems.basicApi;
  if(entity === 'products') return client.crm.products.basicApi;

  throw new Error(`Unsupported entity: ${entity}`)
}

type EntityPage = {
  results: {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    archived?: boolean,
    properties: {
      [key: string]: string,
    },
  }[],
  paging?: {
    next?: {
      after?: string,link?: string }
  }
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

  async *run({ input, output, params }: RunArgs) {
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
