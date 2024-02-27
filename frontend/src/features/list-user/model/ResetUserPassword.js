import { resetPassword } from '@shared/api/all/user';

export const ResetUserPassword = async (userId) => {
   try {
      const response = await resetPassword(userId);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
