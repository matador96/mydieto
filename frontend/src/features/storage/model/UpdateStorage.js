import { updateStorage } from '@shared/api/all/storage';

export const UpdateStorage = async (fields, id) => {
   try {
      const response = await updateStorage(fields, id);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
