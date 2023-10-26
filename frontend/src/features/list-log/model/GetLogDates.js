import { getLogDates } from '@shared/api/all/log';

export const GetLogDates = async () => {
   try {
      const response = await getLogDates();
      if (!response.json) throw new Error();
      return { data: response.json.data, count: response.json.count };
   } catch (e) {
      throw new Error(e);
   }
};
