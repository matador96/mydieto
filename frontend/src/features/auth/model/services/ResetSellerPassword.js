import { resetSellerPassword } from '@shared/api/all/seller';

export const ResetSellerPassword = async (email) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await resetSellerPassword(email);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      throw new Error(e);
   }
};
