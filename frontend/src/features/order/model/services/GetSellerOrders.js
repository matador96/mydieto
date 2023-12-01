import { getMyOrders } from '@shared/api/all/seller';

export const GetSellerOrders = async (params) => {
   try {
      const response = await getMyOrders(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      throw new Error(e);
   }
};
