import { register } from '@shared/api/all/user';

export const Register = async (fields) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await register(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      throw new Error(e);
   }
};
