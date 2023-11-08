import { getStorageById } from '@shared/api/all/storage';

export const GetStorageById = async (params) => {
   try {
      const response = await getStorageById(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
