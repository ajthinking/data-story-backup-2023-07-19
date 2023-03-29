import { Client } from "@hubspot/api-client";
import { Computer, ComputerFactory, RunArgs } from "../../Computer";
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

  async *run({ output, params }: RunArgs) {
    const entity = params.entity as string    
    const api = getBasicApi(entity)
    const properties = JSON.parse(params.properties)
    let nextPage = null;
    
    do {
      // Make the API call to get a page of results
      try {
        let page: EntityPage = await api.getPage(
          100,
          nextPage?.after,
          properties,
        );

        // Output the results
        output.pushTo('all', page.results);
      
        // Check if there is a next page of results
        nextPage = page.paging?.next;        
      } catch(e) {
        // TODO add better error handling
        output.pushTo('errors', ['Error fetching page'])
        return
      }

      // Done for now, yield to the event loop
      yield;
    
    } while (nextPage);
  },
});
