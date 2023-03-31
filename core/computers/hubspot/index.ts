import { deriveFrom } from "../../deriveFrom";
import { HubSpotEntity } from "./HubSpotEntity";
import { UpdateEntity } from "./UpdateEntity";

export { HubSpotEntity } from './HubSpotEntity';
export { UpdateEntity } from './UpdateEntity';

/**
 * GET ALL ************************************************************
 */
export const Contacts = deriveFrom(HubSpotEntity, {
  name: 'Contacts',
  label: 'Contacts.all',  
  params: {
    entity: 'contacts',
    properties: '["firstname"]'
  },
})

export const Companies = deriveFrom(HubSpotEntity, {
  name: 'Companies',
  params: {
    entity: 'companies',
    properties: '["name"]'
  },
})

export const Deals = deriveFrom(HubSpotEntity, {
  name: 'Deals',
  params: {
    entity: 'deals',
    properties: '["dealname"]'
  },
})

export const Tickets = deriveFrom(HubSpotEntity, {
  name: 'Tickets',
  params: {
    entity: 'tickets',
    properties: '[]'
  },
})

export const LineItems = deriveFrom(HubSpotEntity, {
  name: 'LineItems',
  params: {
    entity: 'lineItems',
    properties: '[]'
  },
})

export const Products = deriveFrom(HubSpotEntity, {
  name: 'Products',
  params: {
    entity: 'products',
    properties: '[]'
  },
})

/**
 * UPDATE ************************************************************
 */
export const UpdateContact = deriveFrom(UpdateEntity, {
  name: 'UpdateContact',
  label: 'Contacts.update',
  params: {
    entity: 'contacts',
  },
})

export const UpdateCompany = deriveFrom(UpdateEntity, {
  name: 'UpdateCompany',
  params: {
    entity: 'companies',
  },
})

export const UpdateDeal = deriveFrom(UpdateEntity, {
  name: 'UpdateDeal',
  params: {
    entity: 'deals',
  },
})

export const UpdateTicket = deriveFrom(UpdateEntity, {
  name: 'UpdateTicket',
  params: {
    entity: 'tickets',
  },
})

export const UpdateLineItem = deriveFrom(UpdateEntity, {
  name: 'UpdateLineItem',
  params: {
    entity: 'lineItems',
  },
})

export const UpdateProduct = deriveFrom(UpdateEntity, {
  name: 'UpdateProduct',
  params: {
    entity: 'products',
  },
})