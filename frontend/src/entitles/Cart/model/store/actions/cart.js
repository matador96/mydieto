import {
   ADD_TO_CART,
   DELETE_FROM_CART,
   CLEAN_CART,
   UPDATE_CART,
   UPDATE_ADDRESS_OF_CART
} from '../types';

const addToCart = (article) => (dispatch, getState) => {
   const currentCart = getState().cart.items;
   const newList = { ...currentCart };

   if (newList[article.id]) {
      newList[article.id].quantity = newList[article.id].quantity + article.quantity;
   } else {
      newList[article.id] = article;
   }

   dispatch({
      type: ADD_TO_CART,
      payload: newList
   });
};

const deleteFromCart = (id) => (dispatch, getState) => {
   const currentCart = getState().cart.items;
   const newList = { ...currentCart };

   if (newList[id]) {
      delete newList[id];
   }

   dispatch({
      type: DELETE_FROM_CART,
      payload: { ...newList }
   });
};

const cleanCart = () => ({
   type: CLEAN_CART
});

const updateCart = (id, quantity) => (dispatch, getState) => {
   const currentCart = getState().cart.items;
   const newList = { ...currentCart };

   newList[id] = { ...newList[id], quantity };

   dispatch({
      type: UPDATE_CART,
      payload: { ...newList }
   });
};

const updateAddress = (addressId) => ({
   type: UPDATE_ADDRESS_OF_CART,
   payload: addressId
});

export default { addToCart, deleteFromCart, cleanCart, updateCart, updateAddress };
