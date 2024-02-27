/* eslint-disable camelcase */
import { SET_ARTICLE_SEARCH, SET_ARTICLE_FILTER } from '../types';

const initialState = {
   searchArticle: '',
   filterArticle: []
};

const extraReducer = (prevState = initialState, action) => {
   switch (action.type) {
      case SET_ARTICLE_SEARCH:
         return {
            ...prevState,
            searchArticle: action.payload
         };
      case SET_ARTICLE_FILTER:
         return {
            ...prevState,
            filterArticle: action.payload
         };

      default:
         return prevState;
   }
};

export default extraReducer;
