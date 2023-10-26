import { get, post, put, generateQueryParams, _delete } from '../fetch.js';

export const getCategoryById = (id) => get(`/category/${id}`);
export const deleteCategoryById = (id) => _delete(`/category/${id}`, {}, true);

export const getCategoriesByParentId = (parentId, params) =>
   get(generateQueryParams(`/categories/parent/${parentId}`, params));

export const getCategories = (params) =>
   get(generateQueryParams(`/categories`, params));

export const createCategory = (fields) =>
   post(
      '/category',
      {
         ...fields
      },
      true
   );

export const updateCategory = (fields, id) =>
   put(
      `/category/${id}`,
      {
         ...fields
      },
      true
   );
