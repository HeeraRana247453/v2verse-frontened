// ShopInfo.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../../server";
import styles from "../../styles/styles";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { toast } from "react-toastify";
import { AiFillEdit, AiOutlineLogout } from "react-icons/ai";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const { products } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);

    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch, id]);

  const logoutHandler = async () => {
    axios
      .get(`${server}/shop/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const totalReviewsLength = products && products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings = products && products.reduce((acc, product) => acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),0);

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex items-center justify-center">
              <img src={`${data.avatar?.url}`} alt="" className="w-[150px] h-[150px] object-cover rounded-full border-4 border-purple-500"/>
            </div>
            <h3 className="text-center py-2 text-2xl font-bold text-purple-700">
              {data.name}
            </h3>
            <p className="text-center text-gray-600 px-4">{data.description}</p>
          </div>
          <div className="p-5">
            <h5 className="font-bold text-lg">Address</h5>
            <p className="text-gray-700">{data.address}</p>
          </div>
          <div className="p-5">
            <h5 className="font-bold text-lg">Phone Number</h5>
            <p className="text-gray-700">{data.phoneNumber}</p>
          </div>
          <div className="p-5">
            <h5 className="font-bold text-lg">Total Products</h5>
            <p className="text-gray-700">{products && products.length}</p>
          </div>
          <div className="p-5">
            <h5 className="font-bold text-lg">Shop Ratings</h5>
            <p className="text-gray-700">{averageRating.toFixed(1)}/5</p>
          </div>
          <div className="p-5">
            <h5 className="font-bold text-lg">Joined On</h5>
            <p className="text-gray-700">{data?.createdAt?.slice(0, 10)}</p>
          </div>
          {isOwner && (
            <div className="py-5 px-5 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Link to="/settings">
                <div className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md">
                  <AiFillEdit className="mr-2" /> Edit Shop
                </div>
              </Link>
              <button className="flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-lg shadow-md" onClick={logoutHandler}>
                <AiOutlineLogout className="mr-2" /> Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;