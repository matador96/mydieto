import { getReviewById } from '@shared/api/all/review';

export const GetReview = async (id) => {
   try {
      const response = await getReviewById(id);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
