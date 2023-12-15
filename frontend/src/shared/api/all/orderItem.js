import { put, _delete, post } from '../fetch.js';

export const updateOrderItemById = (id, fields) => put(`/orderItem/${id}`, fields);

export const deleteOrderItemById = (id) => _delete(`/orderItem/${id}`, {}, true);

export const addOrderItem = (fields) =>
   post(
      '/orderItem',
      {
         ...fields
      },
      true
   );
