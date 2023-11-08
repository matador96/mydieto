import { getMySellerProfile } from '@shared/api/all/seller';

export const GetMySellerProfile = async () => {
   try {
      const response = await getMySellerProfile();
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
