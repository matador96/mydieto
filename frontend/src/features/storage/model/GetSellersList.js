import { getSellers } from '@shared/api/all/seller';

export const GetSellersList = async (params) => {
   try {
      const response = await getSellers(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      throw new Error(e);
   }
};
