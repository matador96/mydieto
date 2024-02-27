import { resetPassword } from '@shared/api/all/user';

export const ResetPassword = async (email) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await resetPassword(email);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      throw new Error(e);
   }
};
