import { ComputerConfigFactory, RunArgs } from "../../types/Computer";
import { ComputerConfig } from "../../types/ComputerConfig";
import { DefaultParams } from "../../Param";
import { json, number, string } from "../../ParamBuilder";
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

export const GetAllEntities: ComputerConfigFactory = (): ComputerConfig => ({
  name: 'GetAll',
  outputs: ['all', 'errors'],
  params: {
    ...DefaultParams,
    entity: string('entity').value('companies').get(),
    properties: json('properties').value('["name"]').get(),
    limit: number('limit').value(1000).get(),
  },
  tags: ['Abstract'],
  category: 'HubSpot',

  async *run({ output, params }) {
    let taken = 0
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
        taken += page.results.length
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
    
    } while (nextPage && taken < params.limit);
  },
});
