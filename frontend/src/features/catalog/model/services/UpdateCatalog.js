import { updateCatalog } from '@shared/api/all/catalog';

export const UpdateCatalog = async (fields, catalogId) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await updateCatalog(fields, catalogId);
      return response;
   } catch (e) {
      throw new Error(e);
   }
};
