import { getMyAddresses } from '@shared/api/all/seller';

export const GetMyAddressList = async (params) => {
   try {
      const response = await getMyAddresses(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      console.log(e);
   }
};
