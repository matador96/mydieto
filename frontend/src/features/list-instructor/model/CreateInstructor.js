import { createInstructor } from '@shared/api/all/instructor';

export const CreateInstructor = async (data) => {
   try {
      const response = await createInstructor(data);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
