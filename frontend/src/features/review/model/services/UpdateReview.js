import { updateReview } from '@shared/api/all/review';

export const UpdateReview = async (fields, id) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await updateReview(fields, id);
      return response;
   } catch (e) {
      throw new Error(e);
   }
};
