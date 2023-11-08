import { get, generateQueryParams, post, put, _delete } from '../fetch.js';

export const getStorageCount = (id) => get(`/count/storage/${id}`);

export const getStorageById = (id) => get(`/storage/${id}`);

export const getStorages = (params) => get(generateQueryParams(`/storage`, params));

export const addToStorage = (fields) =>
   post(
      `/storage`,
      {
         ...fields
      },
      true
   );

export const updateStorage = (fields, id) =>
   put(
      `/storage/${id}`,
      {
         ...fields
      },
      true
   );

export const deleteStorageById = (id) => _delete(`/storage/${id}`, {}, true);
