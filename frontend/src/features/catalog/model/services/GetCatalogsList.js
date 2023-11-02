import { getCatalogs } from '@shared/api/all/catalog';

export const GetCatalogsList = async (params) => {
   try {
      const response = await getCatalogs(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
