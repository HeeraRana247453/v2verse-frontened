import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems") ? JSON.parse(localStorage.getItem("wishlistItems")) : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);
      if (isItemExist) {
        state.wishlist = state.wishlist.map((i) =>i._id === isItemExist._id ? item : i ); // Update the existing item
      } 
      else {
        state.wishlist.push(item);// Add a new item
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((i) => i._id !== action.payload);
    },
  },
});

// Export actions
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

// Export reducer
export default wishlistSlice.reducer;
