import { updateMySellerProfile } from '@shared/api/all/seller';

export const UpdateMySellerProfile = async (fields) => {
   try {
      const response = await updateMySellerProfile(fields);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      throw new Error(e);
   }
};
