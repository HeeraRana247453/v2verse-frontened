import { addToCart, removeFromCart } from "../reducers/cart";


export const addToCartAsync = (data) => async (dispatch, getState) => {
  dispatch(addToCart(data)); 
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart)); //Update localStorage
  return data;
};

export const removeFromCartAsync = (data) => async (dispatch, getState) => {
  dispatch(removeFromCart(data._id)); 
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart)); // Update localStorage
  return data;
};
