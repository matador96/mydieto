import { getCategories } from '@shared/api/all/category';

export const GetCategoriesList = async (params) => {
   try {
      const response = await getCategories(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
