import { get, post, put, generateQueryParams } from '../fetch.js';

export const getOrderById = (id) => get(`/order/${id}`);

export const sendCodeToSellerOrderById = (id) => get(`/order/${id}/send/code`);
export const checkCodeToSellerOrderById = (id, code) =>
   get(`/order/${id}/check/code/${code}`);

export const getOrders = (params) => get(generateQueryParams(`/orders`, params));

export const createOrder = (fields) =>
   post(
      '/order',
      {
         ...fields
      },
      true
   );

export const updateOrder = (fields, id) =>
   put(
      `/order/${id}`,
      {
         ...fields
      },
      true
   );
