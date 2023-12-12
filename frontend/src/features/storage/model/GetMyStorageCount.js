import { getMyStorageCount } from '@shared/api/all/seller';

export const GetMyStorageCount = async () => {
   try {
      const response = await getMyStorageCount();
      if (!response.json) throw new Error();
      return { data: response.json.data };
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
