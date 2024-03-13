import { createCourse } from '@shared/api/all/course';

export const CreateCourse = async (fields) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await createCourse(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
