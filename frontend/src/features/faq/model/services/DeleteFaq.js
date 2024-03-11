import { deleteFaqById } from '@shared/api/all/faq';

export const DeleteFaq = async (id) => {
   try {
      const response = await deleteFaqById(id);
      return response;
   } catch (e) {
      throw new Error(e);
   }
};
