import { createCatalog } from '@shared/api/all/catalog';

export const CreateCatalog = async (fields) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await createCatalog(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
