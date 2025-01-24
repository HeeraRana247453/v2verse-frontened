import axios from "axios";
import { server } from "../../server";
import {getAllOrdersUserRequest,getAllOrdersUserSuccess,getAllOrdersUserFailed,getAllOrdersShopRequest,getAllOrdersShopSuccess,getAllOrdersShopFailed,
  adminAllOrdersRequest,adminAllOrdersSuccess,adminAllOrdersFailed,} from "../reducers/orders";

// Get all orders of user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersUserRequest());

    const { data } = await axios.get(`${server}/order/get-all-orders/${userId}`);

    dispatch(getAllOrdersUserSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersUserFailed(error.response.data.message));
  }
};

// Get all orders of seller
export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersShopRequest());

    const { data } = await axios.get(`${server}/order/get-seller-all-orders/${shopId}`);

    dispatch(getAllOrdersShopSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersShopFailed(error.response.data.message));
  }
};

// Get all orders of admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch(adminAllOrdersRequest());

    const { data } = await axios.get(`${server}/order/admin-all-orders`, {withCredentials: true,});

    dispatch(adminAllOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(adminAllOrdersFailed(error.response.data.message));
  }
};
