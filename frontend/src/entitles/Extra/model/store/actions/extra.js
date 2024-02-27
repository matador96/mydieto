import { SET_ARTICLE_SEARCH, SET_ARTICLE_FILTER } from '../types';

const setSearchArticle = (str) => ({
   type: SET_ARTICLE_SEARCH,
   payload: str
});

const setFilterArticle = (arr) => ({
   type: SET_ARTICLE_FILTER,
   payload: arr
});

export default { setSearchArticle, setFilterArticle };
