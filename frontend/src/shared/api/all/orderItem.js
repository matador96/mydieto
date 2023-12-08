import { put } from '../fetch.js';

export const updateOrderItemById = (id, fields) => put(`/orderItem/${id}`, fields);
