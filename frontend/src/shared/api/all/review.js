import { get, put, post, generateQueryParams } from '../fetch.js';

export const getReviews = (params, whereQuery) =>
   get(
      `${generateQueryParams(`/reviews`, params)}${
         whereQuery ? `&whereQuery=${whereQuery}` : ''
      }`
   );

export const getReviewById = (id) => get(`/review/${id}`);

export const createReview = (fields) =>
   post(
      '/review',
      {
         ...fields
      },
      true
   );

export const updateReview = (fields, id) =>
   put(
      `/review/${id}`,
      {
         ...fields
      },
      true
   );
