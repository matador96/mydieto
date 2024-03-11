import { createFaq } from '@shared/api/all/faq';

export const CreateFaq = async (fields) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await createFaq(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
