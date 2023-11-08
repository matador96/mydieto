import { getAddresses } from '@shared/api/all/address';

export const GetAddressList = async (params) => {
   try {
      const response = await getAddresses(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
