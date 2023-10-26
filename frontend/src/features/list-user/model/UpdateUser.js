import { updateUser } from '@shared/api/all/user';

export const UpdateUser = async (fields, userId) => {
   try {
      const response = await updateUser(fields, userId);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
