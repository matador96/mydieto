import { SET_CATALOG_SEARCH, SET_CATALOG_FILTER } from '../types';

const setSearchCatalog = (str) => ({
   type: SET_CATALOG_SEARCH,
   payload: str
});

const setFilterCatalog = (arr) => ({
   type: SET_CATALOG_FILTER,
   payload: arr
});

export default { setSearchCatalog, setFilterCatalog };
