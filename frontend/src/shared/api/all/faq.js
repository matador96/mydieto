import { get, post, put, _delete, generateQueryParams } from '../fetch.js';

export const getFaqs = (params) => get(generateQueryParams(`/faqs`, params));

export const getFaqById = (id) => get(`/faq/${id}`);

export const createFaq = (fields) =>
   post(
      '/faq',
      {
         ...fields
      },
      true
   );

export const deleteFaqById = (id) => _delete(`/faq/${id}`, {}, true);

export const updateFaq = (fields, id) =>
   put(
      `/faq/${id}`,
      {
         ...fields
      },
      true
   );
