import { getLogs } from '@shared/api/all/log';

export const GetLogList = async (params) => {
   try {
      const response = await getLogs(params);
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      throw new Error(e);
   }
};
