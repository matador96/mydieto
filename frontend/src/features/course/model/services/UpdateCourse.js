import { updateCourse } from '@shared/api/all/course';

export const UpdateCourse = async (fields, id) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await updateCourse(fields, id);
      return response;
   } catch (e) {
      throw new Error(e);
   }
};
