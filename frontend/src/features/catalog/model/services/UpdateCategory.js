import { updateCategory } from '@shared/api/all/category';

export const UpdateCategory = async (fields, categoryId) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await updateCategory(fields, categoryId);
      return response;
   } catch (e) {
      throw new Error(e);
   }
};
