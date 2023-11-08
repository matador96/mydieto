import { getAddressById } from '@shared/api/all/address';

export const GetAddress = async (id) => {
   try {
      const response = await getAddressById(id);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
