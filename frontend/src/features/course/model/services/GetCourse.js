import { getCourseById } from '@shared/api/all/course';

export const GetCourse = async (id) => {
   try {
      const response = await getCourseById(id);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
