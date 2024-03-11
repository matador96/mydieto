import { updateFaq } from '@shared/api/all/faq';

export const UpdateFaq = async (fields, faqId) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await updateFaq(fields, faqId);
      return response;
   } catch (e) {
      throw new Error(e);
   }
};
