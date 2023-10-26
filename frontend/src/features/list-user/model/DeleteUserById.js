import { deleteUserById } from '@shared/api/all/user';

export const DeleteUserById = async (params) => {
   try {
      const response = await deleteUserById(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
