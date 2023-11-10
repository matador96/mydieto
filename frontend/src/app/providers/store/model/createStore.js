import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '@entitles/User/model/store/reducers/user';
import cartReducer from '@entitles/Cart/model/store/reducers/cart';

const rootReducer = combineReducers({
   user: userReducer,
   cart: cartReducer
});

const composeEnhancers =
   typeof window === 'object' && window.REDUX_DEVTOOLS_EXTENSION_COMPOSE
      ? window.REDUX_DEVTOOLS_EXTENSION_COMPOSE({
           // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
