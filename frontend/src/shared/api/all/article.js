import {
   get,
   post,
   put,
   generateQueryParams,
   getAuthHeaders,
   requestResult,
   API_URL
} from '../fetch.js';

export const getArticles = (params) => get(generateQueryParams(`/articles`, params));

export const getArticleById = (id) => get(`/article/${id}`);

export const createArticle = (fields) =>
   post(
      '/article',
      {
         ...fields
      },
      true
   );

export const updateArticle = async (fields, id) => {
   const url = `/article/${id}`;
   return await fetch(`${API_URL}${url}`, {
      method: 'put',
      body: fields,
      headers: { ...(await getAuthHeaders()) }
   }).then((res) => {
      return res.json().then((json) => requestResult(res, json));
   });
};
