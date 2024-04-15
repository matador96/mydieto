import {
   get,
   post,
   put,
   generateQueryParams,
   getAuthHeaders,
   requestResult,
   API_URL
} from '../fetch.js';

export const getInstructorById = (id) => get(`/instructor/${id}`);

export const getInstructors = (params, whereQuery) =>
   get(
      `${generateQueryParams(`/instructors`, params)}${
         whereQuery ? `&whereQuery=${whereQuery}` : ''
      }`
   );

export const createInstructor = async (fields) => {
   const url = `/instructor`;

   return await fetch(`${API_URL}${url}`, {
      method: 'post',
      body: fields,
      headers: { ...(await getAuthHeaders()) }
   }).then((res) => {
      return res.json().then((json) => requestResult(res, json));
   });
};

export const updateInstructor = async (fields, id) => {
   const url = `/instructor/${id}`;

   return await fetch(`${API_URL}${url}`, {
      method: 'put',
      body: fields,
      headers: { ...(await getAuthHeaders()) }
   }).then((res) => {
      return res.json().then((json) => requestResult(res, json));
   });
};
