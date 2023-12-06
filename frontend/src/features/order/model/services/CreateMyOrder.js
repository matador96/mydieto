import { createMyOrder } from '@shared/api/all/seller';

export const CreateMyOrder = async (fields) => {
   try {
      const response = await createMyOrder(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
