/* eslint-disable camelcase */
import { SET_CATALOG_SEARCH, SET_CATALOG_FILTER } from '../types';

const initialState = {
   searchCatalog: '',
   filterCatalog: []
};

const extraReducer = (prevState = initialState, action) => {
   switch (action.type) {
      case SET_CATALOG_SEARCH:
         return {
            ...prevState,
            searchCatalog: action.payload
         };
      case SET_CATALOG_FILTER:
         return {
            ...prevState,
            filterCatalog: action.payload
         };

      default:
         return prevState;
   }
};

export default extraReducer;
