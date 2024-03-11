import { getFaqs } from '@shared/api/all/faq';

export const GetFaqs = async (params) => {
   try {
      const response = await getFaqs(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
