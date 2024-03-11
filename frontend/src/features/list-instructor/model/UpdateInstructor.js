import { updateInstructor } from '@shared/api/all/instructor';

export const UpdateInstructor = async (fields, id) => {
   try {
      const response = await updateInstructor(fields, id);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
