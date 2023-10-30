import { createCategory } from '@shared/api/all/category';

export const CreateCategory = async (fields) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await createCategory(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
