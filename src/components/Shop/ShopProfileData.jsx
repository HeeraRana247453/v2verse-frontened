// ShopProfileData.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { getAllProductsShop } from "../../redux/actions/product";
import { getAllEventsShop } from "../../redux/actions/event";
import Ratings from "../Products/Ratings";
import ProductCard from "../Route/ProductCard/ProductCard";
import { FaBoxOpen, FaCalendarAlt, FaRegCalendarTimes, FaStar } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch, id]);

  const [active, setActive] = useState(1);
  const allReviews = products && products.map((product) => product.reviews).flat();

  const tabs = [
    { id: 1, label: "Shop Products", icon: <FaBoxOpen className="mr-2" /> },
    { id: 2, label: "Running Events", icon: <FaCalendarAlt className="mr-2" /> },
    { id: 3, label: "Shop Reviews", icon: <FaStar className="mr-2" /> },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button key={tab.id} className={`flex items-center px-4 py-2 rounded-md shadow-sm font-bold
               ${active === tab.id ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-purple-300"}`}
              onClick={() => setActive(tab.id)}>
              {tab.icon} <span className="hidden sm:flex">{tab.label}</span>
            </button>
          ))}
        </div>

        {isOwner && (
          <Link to="/dashboard">
            <div className="bg-green-500 flex text-white px-4 py-2 rounded-md shadow-md">
              <span className="hidden sm:flex">Go Dashboard</span><RxDashboard className="mt-0 sm:mt-1 ml-0 sm:ml-1" size={17}/>
            </div>
          </Link>
        )}
      </div>

      {active === 1 && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products &&
            products.map((product, index) => (
              <ProductCard data={product} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="w-full">
          <div className={`grid grid-cols-1 gap-[20px] ${events[0] && `md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px]`} mb-12 border-0`}>
          {events &&
            events.map((event, index) => (
              <ProductCard data={event} key={index} isShop={true} isEvent={true} />
            ))}
          {events?.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full h-96 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg p-6">
            {/* Icon Section */}
            <div className="flex items-center justify-center bg-white rounded-full w-24 h-24 mb-6 shadow-lg">
              <FaRegCalendarTimes className="text-blue-500 text-5xl" />
            </div>

            {/* Text Section */}
            <h4 className="text-2xl font-bold mb-2">No Events Available</h4>
            <p className="text-center text-lg">
              There's nothing here at the moment. Check back soon for exciting events!
            </p>

            {/* Call-to-Action Button */}
            <button className="mt-6 px-6 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
              onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </div>
          )}
        </div>
        </div>
      )}

      {active === 3 && (
        <div>
          {allReviews?.map((review, index) => (
            <div key={index} className="flex items-start space-x-4 py-4 border-b">
              {/* Temporarly hardcode the image url, later i will resole the avatar url issue */}
              <img src={`${"https://res.cloudinary.com/dmvmebkrr/image/upload/v1755955906/avatars/ixm5siq81irrlydmeni6.jpg" || review.user.avatar?.url}`} alt="" className="w-[50px] h-[50px] rounded-full"/>
              <div>
                <h4 className="font-bold">{review.user.name}</h4>
                <Ratings rating={review.rating} />
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {allReviews?.length === 0 && (
            <h5 className="text-center text-gray-700">No Reviews available!</h5>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;