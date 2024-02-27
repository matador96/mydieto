import { loginUser, getUser, logoutUser } from '@shared/api/all/user';
import {
   setLocalStorageByKey,
   removeLocalStorageByKey
} from '@shared/lib/localStorage';
import { USER_LOCALSTORAGE_KEY } from '@shared/const/localStorage';

export const AuthByLoginAndPassword = async (authData) => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await loginUser(authData);

      const token = response.json.jwt;
      setLocalStorageByKey(USER_LOCALSTORAGE_KEY, token);

      return response.json.data;
   } catch (e) {
      throw new Error(e);
   }
};

export const CheckAuth = async () => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await getUser();

      // if (response === false) throw new Error(401);

      return response;
   } catch (e) {
      // if (e === '401') {
      //    return;
      // }
      // throw new Error(e.message);
   }
};

export const Logout = async () => {
   try {
      // TODO по хорошему диспатч должен быть здесь
      const response = await logoutUser();
      if (!response.json) throw new Error();

      removeLocalStorageByKey(USER_LOCALSTORAGE_KEY);

      return response.json.data;
   } catch (e) {
      console.log(e);
   }
};
