/* eslint-disable camelcase */
import { SET_CATALOG_SEARCH } from '../types';

const initialState = {
   searchCatalog: ''
};

const extraReducer = (prevState = initialState, action) => {
   switch (action.type) {
      case SET_CATALOG_SEARCH:
         return {
            ...prevState,
            searchCatalog: action.payload
         };
      default:
         return prevState;
   }
};

export default extraReducer;
