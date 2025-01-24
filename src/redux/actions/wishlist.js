import { addToWishlist, removeFromWishlist } from "../reducers/wishlist";

// Add to wishlist action
export const addToWishlistAsync = (data) => (dispatch, getState) => {
    dispatch(addToWishlist(data));
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    return data;
  };
  
  // Remove from wishlist action
  export const removeFromWishlistAsync = (data) => (dispatch, getState) => {
    dispatch(removeFromWishlist(data._id));
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    return data;
  };
  