import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
// import styles from "../../styles/styles";
import { removeFromWishlistAsync } from "../../redux/actions/wishlist";
import { addToCartAsync } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const {cart} = useSelector((state)=> state.cart);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlistAsync(data));
  };

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (data.stock < 1) {
      toast.error("Product is out of stock!");
    } 
    else if (isItemExists) {
      toast.error("Item already in cart!");
    } 
    else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCartAsync(cartData));
      setOpenWishlist(false);
      toast.success(`Item added to cart successfully!`);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50">
      <div className="fixed top-0 right-0 h-full w-[80%] sm:w-[60%] md:w-[50%] lg:w-[30%] bg-white shadow-lg overflow-y-auto rounded-l-lg">
        {wishlist && wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-pink-100 to-purple-100">
            {/* Close Button */}
            <RxCross1 size={30} className="absolute top-4 right-4 text-gray-700 cursor-pointer hover:text-gray-900" onClick={() => setOpenWishlist(false)}/>
            <FiHeart size={100} className="text-pink-500 mb-6" />
            <h5 className="text-pink-700 text-2xl font-bold">
              Your wishlist is empty! ❤️
            </h5>
            <p className="text-pink-500 mt-3 text-center px-4">
              Save your favorite items to view them later.
            </p>
            <button onClick={() => setOpenWishlist(false)} className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-lg shadow-lg hover:scale-105 transition-transform">
              Continue Browsing
            </button>
          </div>
        ) : (
          <>
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <RxCross1 size={25} className="cursor-pointer text-gray-700 hover:text-gray-900" onClick={() => setOpenWishlist(false)}/>
            </div>

            {/* Wishlist Header */}
            <div className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-lg mx-4 shadow-md">
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-lg font-semibold">
                {wishlist.length} item{wishlist.length > 1 ? "s" : ""} in Wishlist
              </h5>
            </div>

            {/* Wishlist Items */}
            <div className="mt-5 px-4 space-y-4">
              {wishlist.map((item, index) => (
                <CartSingle key={index} data={item} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler}/>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const totalPrice = data.discountPrice;

  return (
    <div className="flex items-center p-4 bg-white shadow-sm rounded-lg border border-gray-200">
      {/* Remove Icon */}
      <RxCross1 size={20} className="cursor-pointer text-gray-500 hover:text-gray-700 mr-4" onClick={() => removeFromWishlistHandler(data)} />

      {/* Product Image */}
      <img src={data?.images[0]?.url} alt={data.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover mr-4" />

      {/* Product Info */}
      <div className="flex-1">
        <h1 className="text-sm sm:text-base font-medium text-gray-700">
          {data.name.length > 40 ? data.name.slice(0, 37) + "..." : data.name}
        </h1>
        <h4 className="text-red-600 text-sm sm:text-base font-semibold mt-2">
        INR₹ {totalPrice.toFixed(2)}
        </h4>
      </div>

      {/* Add to Cart Icon */}
      <BsCartPlus size={25} className="cursor-pointer text-green-600 hover:text-green-800" title="Add to Cart" onClick={() => addToCartHandler(data)}/>
    </div>
  );
};

export default Wishlist;
