import { registerClient } from '@shared/api/all/user';

export const RegisterClient = async (fields) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await registerClient(fields);

      if (response?.json?.error) {
         throw new Error(response?.json?.error?.message || 'Ошибка');
      }
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e.message);
   }
};
