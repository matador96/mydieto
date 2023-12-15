import { addOrderItem } from '@shared/api/all/orderItem';

export const AddOrderItem = async (fields) => {
   try {
      const response = await addOrderItem(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
