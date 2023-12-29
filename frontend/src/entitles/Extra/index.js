import { getSearchCatalog } from './model/selectors/getSearchCatalog';
import { getFilterCatalog } from './model/selectors/getFilterCatalog';

import extraReducer from './model/store/reducers/extra';
import extraActions from './model/store/actions/extra';

export { extraReducer, extraActions, getSearchCatalog, getFilterCatalog };
