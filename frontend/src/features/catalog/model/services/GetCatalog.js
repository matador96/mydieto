import { getCatalogById } from '@shared/api/all/catalog';

export const GetCatalog = async (id) => {
   try {
      const response = await getCatalogById(id);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
