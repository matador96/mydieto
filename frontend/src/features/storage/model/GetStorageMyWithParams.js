import { getMyStorage } from '@shared/api/all/seller';

export const GetStorageMyWithParams = async (params) => {
   try {
      const response = await getMyStorage(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      throw new Error(e);
   }
};
