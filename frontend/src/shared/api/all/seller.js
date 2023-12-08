import { get, generateQueryParams, post, put } from '../fetch.js';

// export const getAddressSuggestions = (params) =>
//    get(generateQueryParams(`/address/suggestions`, params));

// export const getAddressById = (id) => get(`/address/${id}`);

export const getMyAddresses = (params) =>
   get(generateQueryParams(`/seller/addresses`, params));

export const getMyOrders = (params) =>
   get(generateQueryParams(`/seller/orders`, params));

export const getMyStorage = (params) =>
   get(generateQueryParams(`/seller/storage`, params));

export const resetSellerPassword = (email) => get(`/seller/reset/${email}`);

export const getSellers = (params) => get(generateQueryParams(`/sellers`, params));

export const createMyOrder = (fields) =>
   post(
      '/seller/order',
      {
         ...fields
      },
      true
   );

export const updateMyOrder = (fields, id) =>
   put(
      `/seller/order/${id}`,
      {
         ...fields
      },
      true
   );

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
