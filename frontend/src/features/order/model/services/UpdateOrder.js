import { updateOrder } from '@shared/api/all/orders';

export const UpdateOrder = async (id, fields) => {
   try {
      const response = await updateOrder(id, fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
