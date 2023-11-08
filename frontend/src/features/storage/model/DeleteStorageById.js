import { deleteStorageById } from '@shared/api/all/storage';

export const DeleteStorageById = async (id) => {
   try {
      const response = await deleteStorageById(id);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
