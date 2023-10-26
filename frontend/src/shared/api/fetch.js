import { USER_LOCALSTORAGE_KEY } from '@shared/const/localStorage';
import { getLocalStorageByKey } from '@shared/lib/localStorage';
import { message } from 'antd';
import qs from 'query-str';

const SUCCESS_STATUS = 200;
export const API_URL = '/api/v1';

export const generateQueryParams = (url, params) => qs.stringify(params, url);

export const getAuthHeaders = async () => {
   let headers = {};

   const token = await getLocalStorageByKey(USER_LOCALSTORAGE_KEY);

   if (token) {
      headers.Authorization = `Bearer ${token}`;
   }

   return headers;
};

const generateRequestSettings = async (method, body) => {
   const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(await getAuthHeaders())
   };

   let defaultSettings = { method, headers };
   if (body) {
      return {
         ...defaultSettings,
         body: JSON.stringify(body)
      };
   }

   return defaultSettings;
};

export const requestResult = (res, json) => ({
   headers: res.headers,
   status: res.status,
   json
});

export const put = async (destination, body) =>
   await doRequest('PUT', destination, body);

export const post = async (destination, body) =>
   await doRequest('POST', destination, body);

export const patch = async (destination, body) =>
   await doRequest('PATCH', destination, body);

export const _delete = async (destination, body) =>
   await doRequest('DELETE', destination, body);

export const get = async (destination) => await doRequest('GET', destination, null);

const doRequest = async (method, destination, body) => {
   try {
      const result = await fetch(
         `${API_URL}${destination}`,
         await generateRequestSettings(method, body)
      ).then((res) => {
         return res.json().then((json) => requestResult(res, json));
      });

      if (result.status === SUCCESS_STATUS) {
         return result;
      } else {
         if (result.status === 401) {
            return false;
         }

         if (result.status === 423) {
            return result;
         }

         throw Error(result?.json?.error?.message);
      }

      // eslint-disable-next-line no-unreachable
      if (result.status === 401) {
         return false;
      }

      sendErrorNotification(result);
   } catch (e) {
      throw new Error(e.message);
   }
};

const sendErrorNotification = (result) => {
   message.error(result?.json?.error?.message || 'Неизвестная ошибка.');
};
