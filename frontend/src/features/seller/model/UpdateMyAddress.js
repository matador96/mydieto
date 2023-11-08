import { updateMyAddress } from '@shared/api/all/seller';

export const UpdateMyAddress = async (fields, id) => {
   try {
      const response = await updateMyAddress(fields, id);
      return response;
   } catch (e) {
      throw new Error(e);
   }
};
