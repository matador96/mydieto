import { getArticles } from '@shared/api/all/article';

export const GetArticlesList = async (params) => {
   try {
      const response = await getArticles(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
