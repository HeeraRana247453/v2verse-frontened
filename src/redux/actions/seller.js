import axios from "axios";
import { server } from "../../server";
import { loadSellerFail, loadSellerRequest, loadSellerSuccess,
    getAllSellersFail, getAllSellersRequest, getAllSellersSuccess,
    
 } from "../reducers/seller";


// Load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch(loadSellerRequest());

    const { data } = await axios.get(`${server}/shop/getSeller`, {withCredentials: true});

    dispatch(loadSellerSuccess(data.seller));
  } catch (error) {
    dispatch(
      loadSellerFail(error.response?.data?.message || "Failed to load seller")
    );
  }
};


// Get all sellers (admin)
export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch(getAllSellersRequest());

    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, { withCredentials: true});

    dispatch(getAllSellersSuccess(data.sellers));
  } 
  catch (error) {
    dispatch(getAllSellersFail(error.response?.data?.message || "Failed to fetch sellers"));
  }
};
