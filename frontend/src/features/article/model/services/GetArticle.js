import { getArticleById } from '@shared/api/all/article';

export const GetArticle = async (id) => {
   try {
      const response = await getArticleById(id);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
