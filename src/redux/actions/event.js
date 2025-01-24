import axios from "axios";
import { server } from "../../server";
import {eventCreateRequest,eventCreateSuccess,eventCreateFail,
  getAlleventsShopRequest,getAlleventsShopSuccess,getAlleventsShopFailed,
  deleteeventRequest,deleteeventSuccess,deleteeventFailed,
  getAlleventsRequest,getAlleventsSuccess,getAlleventsFailed,} from "../reducers/event"; 

// Create an event
export const createEvent = (data) => async (dispatch) => {
  try {
    dispatch(eventCreateRequest());
    const { data: responseData } = await axios.post(`${server}/event/create-event`, data);
    dispatch(eventCreateSuccess(responseData.event));
  } 
  catch (error) {
    dispatch(eventCreateFail(error.response?.data?.message || "Error"));
  }
};

// Get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAlleventsShopRequest());
    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);
    dispatch(getAlleventsShopSuccess(data.events));
  } 
  catch (error) {
    dispatch(getAlleventsShopFailed(error.response?.data?.message || "Error"));
  }
};

// Delete an event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch(deleteeventRequest());
    const { data } = await axios.delete(`${server}/event/delete-shop-event/${id}`,{withCredentials: true});
    dispatch(deleteeventSuccess(data.message));
  } 
  catch (error) {
    dispatch(deleteeventFailed(error.response?.data?.message || "Error"));
  }
};

// Get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch(getAlleventsRequest());
    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch(getAlleventsSuccess(data.events));
  } 
  catch (error) {
    dispatch(getAlleventsFailed(error.response?.data?.message || "Error"));
  }
};
