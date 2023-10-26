export const getLocalStorageByKey = async (key) => {
   try {
      const res = await localStorage[key];
      return res !== null ? res : null;
   } catch (e) {
      return null;
   }
};

export const setLocalStorageByKey = (key, value) => {
   try {
      return localStorage.setItem(key, value);
   } catch (e) {
      return null;
   }
};

export const removeLocalStorageByKey = (key) => {
   try {
      return localStorage.removeItem(key);
   } catch (e) {
      return null;
   }
};
