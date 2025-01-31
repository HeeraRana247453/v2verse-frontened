import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);
      if (isItemExist) {
        state.cart = state.cart.map((i) => (i._id === isItemExist._id ? item : i)); //If the item is already in the cart, it updates it (e.g., with new quantity or details).
      } 
      else {
        state.cart.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
