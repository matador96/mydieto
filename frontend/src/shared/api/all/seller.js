import { get, generateQueryParams, post, put } from '../fetch.js';

// export const getAddressSuggestions = (params) =>
//    get(generateQueryParams(`/address/suggestions`, params));

// export const getAddressById = (id) => get(`/address/${id}`);

export const getMyAddresses = (params) =>
   get(generateQueryParams(`/seller/addresses`, params));

export const createMyAddress = (fields) =>
   post(
      '/seller/address',
      {
         ...fields
      },
      true
   );

export const updateMyAddress = (fields, id) =>
   put(
      `/seller/address/${id}`,
      {
         ...fields
      },
      true
   );

export const getMySellerProfile = () => get(`/seller/profile`);

// export const createAddress = (fields) =>
//    post(
//       '/address',
//       {
//          ...fields
//       },
//       true
//    );
