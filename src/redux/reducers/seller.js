import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isSeller: false,
  seller: null,
  sellers: null, // For admin use case
  error: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    // Load single seller actions
    loadSellerRequest: (state) => {
      state.isLoading = true;
    },
    loadSellerSuccess: (state, action) => {
      state.isLoading = false;
      state.isSeller = true;
      state.seller = action.payload;
    },
    loadSellerFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    },

    // Get all sellers actions (admin)
    getAllSellersRequest: (state) => {
      state.isLoading = true;
    },
    getAllSellersSuccess: (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    },
    getAllSellersFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {loadSellerRequest,loadSellerSuccess,loadSellerFail,getAllSellersRequest,getAllSellersSuccess,getAllSellersFail,clearErrors,} = sellerSlice.actions;

export default sellerSlice.reducer;
