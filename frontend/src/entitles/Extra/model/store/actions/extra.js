import { SET_CATALOG_SEARCH } from '../types';

const setSearchCatalog = (str) => ({
   type: SET_CATALOG_SEARCH,
   payload: str
});

export default { setSearchCatalog };
