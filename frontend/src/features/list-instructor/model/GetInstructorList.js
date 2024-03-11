import { getInstructors } from '@shared/api/all/instructor';

export const GetInstructorList = async (params) => {
   try {
      const response = await getInstructors(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
