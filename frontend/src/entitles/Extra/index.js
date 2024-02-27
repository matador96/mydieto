import { getSearchArticle } from './model/selectors/getSearchArticle';
import { getFilterArticle } from './model/selectors/getFilterArticle';

import extraReducer from './model/store/reducers/extra';
import extraActions from './model/store/actions/extra';

export { extraReducer, extraActions, getSearchArticle, getFilterArticle };
