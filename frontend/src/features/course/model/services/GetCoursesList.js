import { getCourses } from '@shared/api/all/course';

export const GetCoursesList = async (params) => {
   try {
      const response = await getCourses(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
