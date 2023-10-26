import { getUsers } from '@shared/api/all/user';

export const getUsersList = async (params) => {
   try {
      const response = await getUsers(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
