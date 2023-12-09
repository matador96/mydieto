import { registerSeller } from '@shared/api/all/seller';

export const RegisterSeller = async (fields) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await registerSeller(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      throw new Error(e);
   }
};
