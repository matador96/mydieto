import { get, post, put, generateQueryParams } from '../fetch.js';

export const getOrderById = (id) => get(`/order/${id}`);

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
