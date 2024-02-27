import { getMyStorageCount } from '@shared/api/all/seller';

export const GetMyStorageCount = async () => {
   try {
      const response = await getMyStorageCount();
      if (!response.json) throw new Error();
      return { data: 0 };
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
