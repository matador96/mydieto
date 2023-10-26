import React from 'react';
import store from './model/createStore';
import { Provider } from 'react-redux';

const StoreProvider = (props) => {
   return <Provider store={store}>{props.children}</Provider>;
};

export default StoreProvider;
