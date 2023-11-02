import { getCatalogsByParentId } from '@shared/api/all/catalog';

export const GetCatalogsListByParentId = async (parentId, params) => {
   try {
      const response = await getCatalogsByParentId(parentId, params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
