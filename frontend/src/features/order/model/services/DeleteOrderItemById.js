import { deleteOrderItemById } from '@shared/api/all/orderItem';

export const DeleteOrderItemById = async (id) => {
   try {
      const response = await deleteOrderItemById(id);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
