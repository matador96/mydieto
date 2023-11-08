import { addToStorage } from '@shared/api/all/storage';

export const AddToStorage = async (params) => {
   try {
      const response = await addToStorage(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
