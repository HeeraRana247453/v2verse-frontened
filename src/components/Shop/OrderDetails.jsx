import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFillBagFill } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import { getAllOrdersOfShop } from "../../redux/actions/orders";
import { server } from "../../server";
import { FaCreditCard, FaMapMarkerAlt, FaShippingFast } from "react-icons/fa";
import { BiArrowFromLeft } from "react-icons/bi";
import { RxUpdate } from "react-icons/rx";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(`${server}/order/update-order-status/${id}`,{status,},{ withCredentials: true })
      .then((res) => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
    .put(`${server}/order/order-refund-success/${id}`,{status,},{ withCredentials: true })
    .then((res) => {
      toast.success("Order updated!");
      dispatch(getAllOrdersOfShop(seller._id));
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }

//   console.log(data?.status);

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div className={`${styles.button} !bg-[#fce1e6] !rounded-md text-[#e94560] font-[600] !h-[45px] text-[18px] shadow-md hover:shadow-lg`}>Order List <BiArrowFromLeft/></div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>
      <br />
      <br />

      {/* Order items */}
      {data && data?.cart.map((item, index) => (
          <div key={index} className="w-full flex items-start mb-5 py-3 px-2 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={`${item.images[0]?.url}`} alt="" className="w-[80x] h-[80px] rounded-md"/>
            <div className="w-full">
                <h5 className="pl-3 text-[20px] sm:line-clamp-1 line-clamp-2 overflow-hidden" title={item.name}>{item.name}</h5>
                <h5 className="pl-3 text-[20px] text-[#00000091]"> ₹{item.discountPrice} <sup>x {item.qty}</sup> </h5>
            </div>
          </div>
        ))}

    {/* Orders Info */}
    <div className="border-t w-full">
        {/* Total Price */}
        <div className="pt-4 text-right">
            <h5 className="text-xl font-semibold text-gray-700">
            <span className="text-blue-500">Total Price:</span> 
            <strong className="text-green-600"> ₹{data?.totalPrice}</strong>
            </h5>
        </div>

        <div className="w-full 800px:flex justify-between items-start gap-8 mt-6">
            {/* Shipping Address */}
            <div className="w-full 800px:w-[60%] bg-blue-50 p-4 rounded-md shadow-md">
            <h4 className="text-lg font-semibold text-blue-600 flex items-center">
                <FaMapMarkerAlt/> <p className="px-2">Shipping Address</p>
            </h4>
            <p className="mt-2 text-gray-700"><span className="font-medium">Address: </span>{data?.shippingAddress.address}, {data?.shippingAddress.selectedCity}</p>
            <p className="text-gray-700"><span className="font-medium">Country: </span>{data?.shippingAddress.country}</p>
            <p className="text-gray-700"><span className="font-medium">State: </span>{data?.shippingAddress.selectedState}</p>
            <p className="text-gray-700 font-medium">Ph. No.: {data?.user?.phoneNumber}</p>
            </div>

            {/* Payment Info */}
            <div className="w-full 800px:w-[40%] bg-green-50 lg:mt-0 790px:mt-0 mt-4 p-4 rounded-md shadow-md">
            <h4 className="text-lg font-semibold text-green-600 flex items-center"><FaCreditCard/><p className="px-2">Payment Info</p></h4>
            <p className="mt-2 text-gray-700">
                Status: 
                <strong className={`ml-2 ${data?.paymentInfo?.status === "Succeeded"  ? "text-green-600" : "text-red-600"}`}>
                {data?.paymentInfo?.status || "Not Paid"}
                </strong>
            </p>
            </div>
        </div>

        {/* Order Status */}
        <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <i className="mr-2"><FaShippingFast/></i> Order Status
            </h4>
            {data?.status !== "Processing refund" && data?.status !== "Refund Success" ? (
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-[200px] mt-3 p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-200">
                {["Processing", "Transferred to delivery partner", "Shipping", "Received", "On the way", "Delivered"]
                .slice(["Processing", "Transferred to delivery partner", "Shipping", "Received", "On the way", "Delivered"].indexOf(data?.status))
                .map((option, index) => (
                    <option value={option} key={index}>{option}</option>
                ))}
            </select>
            ) : (
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-[200px] mt-3 p-3 border rounded-md shadow-sm focus:ring focus:ring-red-200">
                {["Processing refund", "Refund Success"]
                .slice(["Processing refund", "Refund Success"].indexOf(data?.status))
                .map((option, index) => (
                    <option value={option} key={index}>{option}</option>
                ))}
            </select>
            )}
        </div>

        {/* Update Button */}
        <button className={`mt-6 w-full 800px:w-[200px] flex justify-center align-top !rounded-md py-3 font-semibold text-lg transition-all ${(data?.status !== "Processing refund") ? "bg-green-300 text-green-900 hover:bg-green-400" : "bg-red-200 text-red-800 hover:bg-red-300"}`}
            onClick={(data?.status !== "Processing refund") ? orderUpdateHandler : refundOrderUpdateHandler}>
            Update Status <RxUpdate className="mt-1 ml-1"/>
        </button>
    </div>
    </div>
  );
};

export default OrderDetails;