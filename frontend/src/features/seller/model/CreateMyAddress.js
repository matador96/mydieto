import { createMyAddress } from '@shared/api/all/seller';

export const CreateMyAddress = async (fields) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await createMyAddress(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
