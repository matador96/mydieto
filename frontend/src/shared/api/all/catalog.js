import {
   get,
   post,
   put,
   generateQueryParams,
   getAuthHeaders,
   requestResult,
   API_URL
} from '../fetch.js';

export const getCatalogs = (params) => get(generateQueryParams(`/catalogs`, params));

export const getCatalogById = (id) => get(`/catalog/${id}`);

export const getCatalogsByParentId = (parentId, params) =>
   get(generateQueryParams(`/catalogs/parent/${parentId}`, params));

export const createCatalog = async (fields) => {
   const url = `/catalog`;

   return await fetch(`${API_URL}${url}`, {
      method: 'post',
      body: fields,
      headers: { ...(await getAuthHeaders()) }
   }).then((res) => {
      return res.json().then((json) => requestResult(res, json));
   });
};

export const updateCatalog = async (fields, id) => {
   const url = `/catalog/${id}`;
   return await fetch(`${API_URL}${url}`, {
      method: 'put',
      body: fields,
      headers: { ...(await getAuthHeaders()) }
   }).then((res) => {
      return res.json().then((json) => requestResult(res, json));
   });
};
