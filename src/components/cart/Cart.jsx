import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCartAsync, removeFromCartAsync } from "../../redux/actions/cart";
import { FiShoppingCart } from "react-icons/fi";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCartAsync(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCartAsync(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black bg-opacity-50 h-screen z-50">
      <div className="fixed top-0 right-0 h-full w-[80%] sm:w-[60%] md:w-[50%] lg:w-[30%] bg-white flex flex-col overflow-y-auto shadow-lg">
        {cart && cart.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
            {/* Close Button */}
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1 size={30} className="absolute top-4 right-4 cursor-pointer text-gray-700 hover:text-gray-900" onClick={() => setOpenCart(false)}/>
            </div>

            {/* Empty Cart Icon */}
            <FiShoppingCart className="text-purple-500 mb-6" size={90} />

            {/* Message */}
            <h5 className="text-purple-700 text-2xl font-bold text-center">
              Your cart is feeling lonely! 🛒
            </h5>
            <p className="text-purple-500 mt-2 text-center px-6">
              Add some items to brighten up your shopping experience.
            </p>

            {/* Button */}
            <button onClick={() => setOpenCart(false)} className="mt-5 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-lg hover:scale-105 transform transition">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <RxCross1 size={25} className="cursor-pointer text-gray-700 hover:text-gray-900" onClick={() => setOpenCart(false)} />
            </div>

            {/* Item Count */}
            <div className="flex items-center px-4">
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-lg font-medium">
                {cart.length} item{cart.length > 1 ? "s" : ""} in Cart
              </h5>
            </div>

            {/* Cart Items */}
            <div className="mt-4 px-4 space-y-4 border-t">
              {cart.map((item, index) => (
                <CartSingle key={index} data={item} quantityChangeHandler={quantityChangeHandler} removeFromCartHandler={removeFromCartHandler}/>
              ))}
            </div>

            {/* Checkout Button */}
            <div className="px-4 py-4 border-t mt-4">
              <Link to="/checkout">
                <button className="w-full py-3 bg-red-500 text-white font-medium rounded-lg shadow-md hover:scale-105 transition">
                  Checkout Now (₹{totalPrice.toFixed(2)})
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updatedData = { ...data, qty: value + 1 };
      quantityChangeHandler(updatedData);
    }
  };

  const decrement = (data) => {
    if (value > 1) {
      setValue(value - 1);
      const updatedData = { ...data, qty: value - 1 };
      quantityChangeHandler(updatedData);
    }
  };

  return (
    <div className="flex items-center border-b p-4">
      <RxCross1 size={20} className="cursor-pointer text-red-600 hover:text-red-800 mr-4" onClick={() => removeFromCartHandler(data)}/>
      <img src={data.images[0]?.url} alt={data.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover mr-4"/>
      <div className="flex-1">
        <h5 className="text-gray-700 font-medium text-sm sm:text-base">
          {data.name.length > 40 ? `${data.name.slice(0, 37)}...` : data.name}
        </h5>
        <div className="flex items-center mt-2">
          <button className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600" onClick={() => increment(data)}>
            <HiPlus size={18} />
          </button>
          <span className="mx-3 text-gray-700 text-sm sm:text-base">
            {value}
          </span>
          <button className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400" onClick={() => decrement(data)}>
            <HiOutlineMinus size={18} />
          </button>
        </div>
        <h5 className="text-red-600 font-semibold text-sm sm:text-base mt-2">
          INR₹ {totalPrice.toFixed(2)}
        </h5>
      </div>
    </div>
  );
};

export default Cart;
