/* eslint-disable camelcase */
import { LOGIN_USER, LOGOUT_USER } from '../types';

const initialState = {
   id: null,
   email: '',
   role: '',
   firstName: '',
   lastName: ''
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
