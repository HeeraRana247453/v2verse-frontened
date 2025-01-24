import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false, // Assume no operation is in progress initially
    event: null, // To hold the created event object
    success: false, // Indicates whether an operation succeeded
    error: null, // For storing error messages
    events: [], // To hold all events of a specific shop
    message: null, // For messages like deletion success
    allEvents: [], // To hold all events globally
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    eventCreateRequest: (state) => {
      state.isLoading = true;
    },
    eventCreateSuccess: (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    },
    eventCreateFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },

    getAlleventsShopRequest: (state) => {
      state.isLoading = true;
    },
    getAlleventsShopSuccess: (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    },
    getAlleventsShopFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    deleteeventRequest: (state) => {
      state.isLoading = true;
    },
    deleteeventSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    deleteeventFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getAlleventsRequest: (state) => {
      state.isLoading = true;
    },
    getAlleventsSuccess: (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
    },
    getAlleventsFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  eventCreateRequest,eventCreateSuccess,eventCreateFail,
  getAlleventsShopRequest,getAlleventsShopSuccess,getAlleventsShopFailed,
  deleteeventRequest,deleteeventSuccess,deleteeventFailed,
  getAlleventsRequest,getAlleventsSuccess,getAlleventsFailed,
  clearErrors,
} = eventSlice.actions;

export default eventSlice.reducer;
