export const getCartCount = (state) => {
   let count = 0;

   Object.values(state.cart.items).map((e) => (count = count + e.quantity));
   return count;
};
