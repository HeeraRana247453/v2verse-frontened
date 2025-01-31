import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCreditCard, FaMapMarkerAlt, FaShippingFast } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { BsFillBagFill } from "react-icons/bs";
import { BiArrowFromLeft } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllOrdersOfUser } from "../../redux/actions/orders";
import { server } from "../../server";
import styles from "../../styles/styles";
import DeliverySteps from "./DeliverySteps";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiReceiptRefund } from "react-icons/hi";
import { MdReviews } from "react-icons/md";


const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    await axios.put(`${server}/product/create-new-review`,{
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  
  const refundHandler = async () => {
    await axios.put(`${server}/order/order-refund/${id}`,{status: "Processing refund"})
    .then((res) => {
      toast.success(res.data.message);
      dispatch(getAllOrdersOfUser(user._id));
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    })
  };

  // Delivery steps calculate
  if(data?.status !== "Processing refund" && data?.status !== "Refund Success"){
    var deliverySteps = ["Processing", "Transferred to delivery partner", "Shipping", "Received", "On the way", "Delivered"].indexOf(data?.status) + 1;
  }else{
    var refundSteps = ["Processing refund", "Refund Success"].indexOf(data?.status) + 1;
  }


  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/profile">
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
          <div key={index} className="w-full flex items-start mb-5 py-3 sm:px-2 px-1 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img src={`${item.images[0]?.url}`} alt="" className="w-[80x] h-[80px] rounded-md"/>
            <div className="w-full">
                <h5 className="pl-3 sm:text-[20px] text-[15px] sm:line-clamp-1 line-clamp-2 overflow-hidden" title={item.name}>{item.name}</h5>
                <h5 className="pl-3 text-[20px] text-[#00000091]"> ₹{item.discountPrice} <sup>x {item.qty}</sup> </h5>

                {/* Review Button */}
                {!item.isReviewed && data?.status === "Delivered" ?  
                <div className={`${styles.button} !rounded-sm !bg-green-700 !h-[40px] !w-[135px] text-[#fff]`} onClick={() => setOpen(true) || setSelectedItem(item)}>
                  <MdReviews/> <p className="pl-2">Write Review</p> 
                  </div> : (null)}
            </div>
          </div>
        ))}

      {/* Review popup */}
      {open && (
        <div className="fixed inset-0 h-screen bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-md p-4 w-[90%] max-w-3xl mx-auto">
            <div className="flex justify-end">
              <RxCross1 size={30} onClick={() => setOpen(false)} className="cursor-pointer text-gray-600 hover:text-gray-800 transition"/>
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-semibold font-Poppins text-center mb-4">Give a Review</h2>

            {/* Product Info */}
            <div className="flex items-center mb-6">
              <img src={`${selectedItem?.images[0]?.url}`} alt="Image loading.." className="w-20 h-20 rounded-md object-cover"/>
              <div className="ml-4">
                <p className="pr-3 text-[20px] sm:line-clamp-1 line-clamp-2 overflow-hidden">{selectedItem?.name}</p>
                <p className="text-lg text-gray-600">
                  ₹{selectedItem?.discountPrice} x {selectedItem?.qty}
                </p>
              </div>
            </div>

            {/* Ratings */}
            <div className="mb-6">
              <h5 className="text-lg font-medium mb-2">Give a Rating <span className="text-red-500">*</span></h5>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)}/>
                  ) : (
                    <AiOutlineStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)}/>
                  )
                )}
              </div>
            </div>

            {/* Comment Section */}
            <div className="mb-6">
              <label className="block text-lg font-medium">
                Write a comment
                <span className="ml-1 font-normal text-sm text-gray-500">(optional)</span>
              </label>
              <textarea name="comment" id="comment" cols="20" rows="5" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="How was your product? Write your expression about it!"
                className="mt-2 w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-200 outline-none"></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button className={`bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md text-lg transition ${rating > 1 ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                onClick={rating > 1 ? reviewHandler : null}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}


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

           {(data?.status === "Delivered") && (
              <div className={`${styles.button} !h-[40px] hover:text-[17px] hover:w-[156px] !rounded-md shadow-md hover:shadow-red-800 bg-red-400 text-white`}
                onClick={refundHandler}>
                <HiReceiptRefund/> <span className="pl-1">Request Refund</span>
              </div>
            )}
           {(data?.status === "Processing refund" || data?.status === "Refund Success") && (
              <div className={`${styles.button} !h-[40px] !w-[160px] !cursor-text !rounded-md shadow-md bg-green-600 text-white`}>
                <HiReceiptRefund/> <span className="px-1">{data?.status }</span>
              </div>
            )}
            </div>
        </div>

        <div className="mt-16 space-y-4">
          <h4 className="text-xl font-semibold text-gray-800 flex items-center">
            <FaShippingFast className="mr-2 text-red-500" size={20}/> {deliverySteps ? `Order Status`: `Refund Status`}
          </h4>
          <p className="text-black w-full md:w-[250px] p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none transition">{data?.status}</p>
        </div>

        {/* Delivery steps map */}
        <DeliverySteps deliverySteps={deliverySteps} refundSteps={refundSteps} />
    </div>
  </div>
  );
};

export default OrderDetails;