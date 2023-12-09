/* eslint-disable camelcase */
import {
   ADD_TO_CART,
   DELETE_FROM_CART,
   CLEAN_CART,
   UPDATE_CART,
   UPDATE_ADDRESS_OF_CART
} from '../types';

const initialState = {
   items: {},
   addressId: null
};

const cartReducer = (prevState = initialState, action) => {
   switch (action.type) {
      case ADD_TO_CART:
         return {
            ...prevState,
            items: action.payload
         };
      case DELETE_FROM_CART:
         return {
            ...prevState,
            items: action.payload
         };

      case CLEAN_CART:
         return {
            ...prevState,
            ...initialState
         };

      case UPDATE_CART:
         return {
            ...prevState,
            items: action.payload
         };

      case UPDATE_ADDRESS_OF_CART:
         return {
            ...prevState,
            ...initialState
         };
      default:
         return prevState;
   }
};

export default cartReducer;
