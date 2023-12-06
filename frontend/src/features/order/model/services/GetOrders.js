import { getOrders } from '@shared/api/all/orders';

export const GetOrders = async (params) => {
   try {
      const response = await getOrders(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      throw new Error(e);
   }
};
