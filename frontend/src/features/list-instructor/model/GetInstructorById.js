import { getInstructorById } from '@shared/api/all/instructor';

export const GetInstructorById = async (id) => {
   try {
      const response = await getInstructorById(id);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
