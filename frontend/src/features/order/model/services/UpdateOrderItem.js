import { updateOrderItemById } from '@shared/api/all/orderItem';

export const UpdateOrderItem = async (id, fields) => {
   try {
      const response = await updateOrderItemById(id, fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
