import { createAddress } from '@shared/api/all/address';

export const CreateAddress = async (fields) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await createAddress(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
