import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import PaymentInfo from "./PaymentInfo";
import CartData from "./CartData.jsx";

// Payment section
const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);
  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  // CreateOrder & onApprove will call onClick paypal button
  const createOrder = (data, actions) => {
    return actions.order.create({
        purchase_units: [{description: "Test Payment",amount: {currency_code: "USD",value: orderData?.totalPrice,},},],
        application_context: {shipping_preference: "NO_SHIPPING",},// not needed if a shipping address is actually needed
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      let paymentInfo = payer;
      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  // 1) Paypal Payment Handler
  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {headers: {"Content-Type": "application/json",},};
    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "Succeeded",
      type: "Paypal",
    };
    await axios.post(`${server}/order/create-order`, order, config)
      .then((res) => {
        const firstCartItemId = res.data.orders[0].cart[0]._id;
        setOpen(false);
        navigate(`/order/success/${firstCartItemId}`);
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  // 2) Razorpay Payment Handler
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const paymentHandler = async (e) => {
    e.preventDefault();
    const paymentData = { amount: Math.round(orderData?.totalPrice * 100) };
    try {
      // Load Razorpay script
      const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!scriptLoaded) {
        toast.error("Failed to load Razorpay. Please try again later.");
        return;
      }
      // Fetch order details from backend
      const { data } = await axios.post(`${server}/payment/process`, { amount: paymentData.amount });
      const { key_id, rzpCreatedOrder } = data;
  
      // Initialize Razorpay
      const options = {
        key: key_id, // Razorpay Key ID from the backend
        amount: rzpCreatedOrder.amount, // Amount in paisa
        currency: rzpCreatedOrder.currency,
        name: "v2verse",
        description: "Payment to v2verse",
        image: "https://res.cloudinary.com/dmvmebkrr/image/upload/v1736663687/avatars/x5g1f8rpoxg0wzq3lt3q.jpg",
        order_id: rzpCreatedOrder.id, // Razorpay Order ID from backend
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post(`${server}/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
  
            if (verifyResponse.data.success) {
              order.paymentInfo = {id: response.razorpay_payment_id,status: "Succeeded", type: "Razorpay Payment",};
            //Now,if payment is successfully verified, an order or orders of cart product will be created in the database
              await axios.post(`${server}/order/create-order`, order)
              .then((res) => {
                const firstCartItemId = res.data.orders[0].cart[0]._id;
                navigate(`/order/success/${firstCartItemId}`);
                toast.success("Order successful!");
                localStorage.setItem("cartItems", JSON.stringify([]));
                localStorage.setItem("latestOrder", JSON.stringify([]));
                window.location.reload();
              });
            } 
            else {
              toast.error("Payment verification failed!");
            }
          } 
          catch (error) {
            toast.error(error.response?.data?.message || "Payment verification failed.");
          }
        },
        prefill: {
          name: user?.name || "Your Name",
          email: user?.email || "your_email@example.com",
          contact: user?.phoneNumber || "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } 
    catch (error) {
      toast.error(error.response?.data?.message || "Payment initialization failed.");
    }
  };

  // 3) Cash on delivery handler
  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    const config = {headers: {"Content-Type": "application/json",},};
    order.paymentInfo = {type: "Cash On Delivery",};
    await axios
    .post(`${server}/order/create-order`, order, config)
    .then((res) => {
      setOpen(false);
      const firstCartItemId = res.data.orders[0].cart[0]._id;
      navigate(`/order/success/${firstCartItemId}`);
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    });
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};


export default Payment;