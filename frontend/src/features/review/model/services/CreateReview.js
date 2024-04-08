import { createReview } from '@shared/api/all/review';

export const CreateReview = async (fields) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await createReview(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
      throw new Error(e);
   }
};
