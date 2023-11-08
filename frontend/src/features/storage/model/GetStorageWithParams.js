import { getStorages } from '@shared/api/all/storage';

export const GetStorageWithParams = async (params) => {
   try {
      const response = await getStorages(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      throw new Error(e);
   }
};
