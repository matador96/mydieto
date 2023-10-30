import { getCategoriesByParentId } from '@shared/api/all/category';

export const GetCategoriesListByParentId = async (parentId, params) => {
   try {
      const response = await getCategoriesByParentId(parentId, params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
