import { getInstructors } from '@shared/api/all/instructor';

export const GetInstructorList = async (params, whereParams = '') => {
   try {
      const response = await getInstructors(params, whereParams);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
