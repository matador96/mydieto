import { get, generateQueryParams, post, put } from '../fetch.js';

export const getAddressSuggestions = (params) =>
   get(generateQueryParams(`/address/suggestions`, params));

export const getAddressById = (id) => get(`/address/${id}`);

export const getAddresses = (params) => get(generateQueryParams(`/address`, params));

export const createAddress = (fields) =>
   post(
      '/address',
      {
         ...fields
      },
      true
   );

export const updateAddress = (fields, id) =>
   put(
      `/address/${id}`,
      {
         ...fields
      },
      true
   );
