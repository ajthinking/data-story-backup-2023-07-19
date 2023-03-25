import { deriveFrom } from "../../deriveFrom";
import { Request } from "../Request";

export const Contacts = deriveFrom(Request, {
  name: 'Contacts',
  params: {
    url: 'https://jsonplaceholder.typicode.com/users',
  },
  tags: ['HubSpot']
})

export const Companies = deriveFrom(Request, {
  name: 'Companies',
  params: {
    url: 'https://jsonplaceholder.typicode.com/todos',
  },
  tags: ['HubSpot']  
})

export const Deals = deriveFrom(Request, {
  name: 'Deals',
  params: {
    url: 'https://jsonplaceholder.typicode.com/posts',
  },
  tags: ['HubSpot']  
})   