import { createArticle } from '@shared/api/all/article';

export const CreateArticle = async (fields) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await createArticle(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
