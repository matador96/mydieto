/* eslint-disable camelcase */
import { LOGIN_USER, LOGOUT_USER } from '../types';

const initialState = {
   id: null,
   login: '',
   roleId: '',
   firstName: '',
   lastName: '',
   post: ''
};

const userReducer = (prevState = initialState, action) => {
   switch (action.type) {
      case LOGIN_USER:
         return {
            ...prevState,
            ...action.payload
         };
      case LOGOUT_USER:
         return {
            ...prevState,
            ...initialState
         };
      default:
         return prevState;
   }
};

export default userReducer;
