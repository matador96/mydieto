import { getCourses } from '@shared/api/all/course';

export const GetCoursesList = async (params, whereParams = '') => {
   try {
      const response = await getCourses(params, whereParams);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
