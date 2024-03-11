import { getFaqById } from '@shared/api/all/faq';

export const GetFaq = async (id) => {
   try {
      const response = await getFaqById(id);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
