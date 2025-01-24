import React, { useState } from "react";
import styles from "../../styles/styles";
import { City, Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Header from "../Layout/Header";
import CheckoutSteps from "./CheckoutSteps";

const Checkout = () => {

  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [country, setCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState(null);

  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

// Submit Payment
  const paymentSubmit = () => {
   if(selectedCity === "" || address === "" || zipCode === null || country === "" || selectedState === ""){
      toast.error("Please choose your delivery address!");
   } 
   else{
    const shippingAddress = {country,selectedState,selectedCity,address,zipCode,};
    const orderData = {cart,totalPrice,subTotalPrice,shipping,discountPrice,shippingAddress,user,}
    localStorage.setItem("latestOrder", JSON.stringify(orderData));// update local storage with the updated orders array
    navigate("/payment");
   }
  };

  const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice,0);

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`)
    .then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } 
        else {
          const eligiblePrice = isCouponValid.reduce((acc, item) => acc + item.qty * item.discountPrice,0);
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    });
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";
  const totalPrice = couponCodeData ? (subTotalPrice + shipping - discountPercentenge).toFixed(2) : (subTotalPrice + shipping).toFixed(2);

  return (
    <>
    <Header/>
    <CheckoutSteps active={1}/>
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            address={address}
            setAddress={setAddress}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>
      <div className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`} onClick={paymentSubmit}>
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
    </>
  );
};

const ShippingInfo = ({user,country,setCountry,selectedState,setSelectedState,userInfo,setUserInfo,selectedCity,setSelectedCity,address,setAddress,zipCode,setZipCode,}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input type="text" value={user && user.name} required className={`${styles.input} !w-[95%]`}/>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input type="email" value={user && user.email} className={`${styles.input}`} required/>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input type="number" value={user && user.phoneNumber} className={`${styles.input} !w-[95%]`} required/>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className={`${styles.input}`} required/>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select className="w-[95%] border h-[40px] rounded-[5px]" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option className="block pb-2" value="">Choose your country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">State</label>
            <select className="w-[95%] border h-[40px] rounded-[5px]" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
              <option className="block pb-2" value="">Choose your state</option>
              {State && State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select className="w-[95%] border h-[40px] rounded-[5px]" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option className="block pb-2" key={""} value="">City</option>
              {City && City.getCitiesOfState(country,selectedState).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address</label>
            <input type="address" value={address} onChange={(e) => setAddress(e.target.value)} className={`${styles.input}`} required/>
          </div>
        </div>

        <div></div>
      </form>
      <div className="w-full">
        {/* Toggle Header */}
        <h5 className="text-sm font-medium cursor-pointer inline-block mb-2" onClick={() => setUserInfo(!userInfo)}>Choose From Saved Addresses ▼</h5>
        {/* Dropdown */}
        <div className={`transition-all duration-300 ease-in-out ${userInfo ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
          {user?.addresses?.map((item, index) => (
            <div key={index} className="w-full flex items-center mt-1 p-2 border rounded-md hover:bg-gray-100">
              {/* Radio Button */}
              <input type="radio" name="address" className="mr-3 accent-blue-500" value={item.addressType} onClick={() => {
                  setCountry(item.country) ||
                  setSelectedState(item.state) ||
                  setSelectedCity(item.city) ||
                  setAddress(item.address) ||
                  setZipCode(item.zipCode)
                }}/>
              {/* Address Type */}
              <h2 className="text-md font-medium">{item.addressType}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CartData = ({ handleSubmit, totalPrice, shipping, subTotalPrice, couponCode, setCouponCode, discountPercentenge,}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">₹{subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">₹{shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]"> - {discountPercentenge ? "₹" + discountPercentenge.toString() : null}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">₹{totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="text" className={`${styles.input} h-[40px] pl-2`} placeholder="Coupoun code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} required/>
        <input className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`} required value="Apply code" type="submit"/>
      </form>
    </div>
  );
};

export default Checkout;