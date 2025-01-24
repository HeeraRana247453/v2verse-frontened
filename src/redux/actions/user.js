import axios from "axios";
import { server } from "../../server";
import { loadUserFail, loadUserRequest, loadUserSuccess,
   updateUserInfoFailed, updateUserInfoRequest, updateUserInfoSuccess,
   updateUserAddressRequest,updateUserAddressSuccess,updateUserAddressFailed,
   deleteUserAddressRequest,deleteUserAddressSuccess,deleteUserAddressFailed,
   getAllUsersRequest, getAllUsersSuccess, getAllUsersFailed,} from "../reducers/user";
import { toast } from "react-toastify";



// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axios.get(`${server}/user/getuser`, {withCredentials: true,});
    console.log("loaduser called!");
    dispatch(loadUserSuccess(data.user));
  } 
  catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};


// Update user information
export const updateUserInformation = (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch(updateUserInfoRequest());
      console.log("update action called");
      const { data } = await axios.put(`${server}/user/update-user-info`,        {
          name,
          email,
          password,
          phoneNumber,
        },
        {
          withCredentials: true,
          headers: {"Access-Control-Allow-Credentials": true,},
        }
      );
      dispatch(updateUserInfoSuccess(data.user));
      toast.success("User Information Updated Successfully!!");
    } 
    catch (error) {
      dispatch(updateUserInfoFailed(error.response?.data?.message || "Failed to update user information"));
    }
  };


// Update user address
export const updateUserAddress = (country, state, city, address, zipCode, addressType) => async (dispatch) => {
  try {
    dispatch(updateUserAddressRequest());
    const { data } = await axios.put(`${server}/user/update-user-addresses`,{
        country,
        state,
        city,
        address,
        zipCode,
        addressType,
      },
      { withCredentials: true }
    );
    dispatch( updateUserAddressSuccess(data.user));
    toast.success("Address Updated Successfully!!");
  } 
  catch (error) {
    dispatch(updateUserAddressFailed(error.response?.data?.message || "Failed to update address"));
  }
};


// Delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserAddressRequest());
    const { data } = await axios.delete(`${server}/user/delete-user-address/${id}`,{ withCredentials: true });
    dispatch(deleteUserAddressSuccess(data.user)
    );
    toast.success("Address Deleted Successfully!!");
  } 
  catch (error) {
    dispatch(deleteUserAddressFailed(error.response?.data?.message || "Failed to delete address"));
  }
};


// Get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());
    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });
    dispatch(getAllUsersSuccess(data.users));
  } 
  catch (error) {
    dispatch(
      getAllUsersFailed(error.response?.data?.message || "Failed to fetch users")
    );
  }
};