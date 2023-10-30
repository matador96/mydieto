import { getCategoryById } from '@shared/api/all/category';

export const GetCategory = async (id) => {
   try {
      const response = await getCategoryById(id);
      if (!response.json) throw new Error();
      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
