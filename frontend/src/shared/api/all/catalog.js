import { get, post, put, generateQueryParams } from '../fetch.js';

export const getCatalogs = (params) => get(generateQueryParams(`/catalogs`, params));

export const getCatalogById = (id) => get(`/catalog/${id}`);

export const getCatalogsByParentId = (parentId, params) =>
   get(generateQueryParams(`/catalogs/parent/${parentId}`, params));

export const createCatalog = (fields) =>
   post(
      '/catalog',
      {
         ...fields
      },
      true
   );

export const updateCatalog = (fields, id) =>
   put(
      `/catalog/${id}`,
      {
         ...fields
      },
      true
   );
