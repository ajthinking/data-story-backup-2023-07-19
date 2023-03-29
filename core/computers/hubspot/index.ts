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
  params: {
    entity: 'contacts',
    properties: '["firstname"]'
  },
  tags: ['HubSpot']
})

export const Companies = deriveFrom(HubSpotEntity, {
  name: 'Companies',
  params: {
    entity: 'companies',
    properties: '["name"]'
  },
  tags: ['HubSpot']
})

export const Deals = deriveFrom(HubSpotEntity, {
  name: 'Deals',
  params: {
    entity: 'deals',
    properties: '["dealname"]'
  },
  tags: ['HubSpot']
})

export const Tickets = deriveFrom(HubSpotEntity, {
  name: 'Tickets',
  params: {
    entity: 'tickets',
    properties: '[]'
  },
  tags: ['HubSpot']
})

export const LineItems = deriveFrom(HubSpotEntity, {
  name: 'LineItems',
  params: {
    entity: 'lineItems',
    properties: '[]'
  },
  tags: ['HubSpot']
})

export const Products = deriveFrom(HubSpotEntity, {
  name: 'Products',
  params: {
    entity: 'products',
    properties: '[]'
  },
  tags: ['HubSpot']
})

/**
 * BATCH UPDATE ************************************************************
 */
export const UpdateContacts = deriveFrom(UpdateEntity, {
  name: 'UpdateContacts',
  params: {
    entity: 'contacts',
    properties: '["firstname"]'
  },
  tags: ['HubSpot']
})