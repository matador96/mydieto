import { createUser } from '@shared/api/all/user';

export const CreateUser = async (data) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await createUser(data);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
