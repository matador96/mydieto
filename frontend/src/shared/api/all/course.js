import { get, put, post, generateQueryParams } from '../fetch.js';

export const getCourses = (params) => get(generateQueryParams(`/courses`, params));

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
