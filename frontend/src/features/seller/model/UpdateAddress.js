import { updateAddress } from '@shared/api/all/address';

export const UpdateAddress = async (fields, id) => {
   try {
      const response = await updateAddress(fields, id);
      return response;
   } catch (e) {
      throw new Error(e);
   }
};
