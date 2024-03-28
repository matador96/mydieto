import { get, put, post, generateQueryParams } from '../fetch.js';

export const getCourses = (params, whereQuery) =>
   get(
      `${generateQueryParams(`/courses`, params)}${
         whereQuery ? `&whereQuery=${whereQuery}` : ''
      }`
   );

export const getCourseById = (id) => get(`/course/${id}`);

export const createCourse = (fields) =>
   post(
      '/course',
      {
         ...fields
      },
      true
   );

export const updateCourse = (fields, id) =>
   put(
      `/course/${id}`,
      {
         ...fields
      },
      true
   );
