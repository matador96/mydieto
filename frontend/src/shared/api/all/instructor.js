import { get, post, put, generateQueryParams } from '../fetch.js';

export const getInstructorById = (id) => get(`/instructor/${id}`);

export const getInstructors = (params) =>
   get(generateQueryParams(`/instructors`, params));

export const createInstructor = (fields) =>
   post(
      '/instructor',
      {
         ...fields
      },
      true
   );

export const updateInstructor = (fields, id) =>
   put(
      `/instructor/${id}`,
      {
         ...fields
      },
      true
   );
