import { updateArticle } from '@shared/api/all/article';

export const UpdateArticle = async (fields, articleId) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await updateArticle(fields, articleId);
      return response;
   } catch (e) {
      throw new Error(e);
   }
};
