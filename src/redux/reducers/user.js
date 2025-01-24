import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  addressloading: false,
  usersLoading: false,
  user: null,
  users: null,
  error: null,
  // successMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Load user actions
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Update user information actions
    updateUserInfoRequest: (state) => {
      state.loading = true;
    },
    updateUserInfoSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    updateUserInfoFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update user address actions
    updateUserAddressRequest: (state) => {
      state.addressloading = true;
    },
    updateUserAddressSuccess: (state, action) => {
      state.addressloading = false;
      // state.successMessage = action.payload.successMessage;
      state.user = action.payload;
    },
    updateUserAddressFailed: (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    },

    // Delete user address actions
    deleteUserAddressRequest: (state) => {
      state.addressloading = true;
    },
    deleteUserAddressSuccess: (state, action) => {
      state.addressloading = false;
      // state.successMessage = action.payload.successMessage;
      state.user = action.payload;
    },
    deleteUserAddressFailed: (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    },

    // Get all users --- admin actions
    getAllUsersRequest: (state) => {
      state.usersLoading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    },
    getAllUsersFailed: (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    },

    // Clear error and success messages
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
    },
  },
});

export const {
  loadUserRequest,loadUserSuccess,loadUserFail,
  updateUserInfoRequest,updateUserInfoSuccess,updateUserInfoFailed,updateUserAddressRequest,updateUserAddressSuccess,updateUserAddressFailed,
  deleteUserAddressRequest,deleteUserAddressSuccess,deleteUserAddressFailed,
  getAllUsersRequest,getAllUsersSuccess,getAllUsersFailed,
  clearErrors,clearMessages,
} = userSlice.actions;

export default userSlice.reducer;
