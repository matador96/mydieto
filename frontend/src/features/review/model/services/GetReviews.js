import { getReviews } from '@shared/api/all/review';

export const GetReviews = async (params) => {
   try {
      const response = await getReviews(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
