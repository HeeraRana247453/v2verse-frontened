import React, { useEffect, useState, useMemo, useLayoutEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails.jsx";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsShop } from "../redux/actions/event.js";

const ProductDetailsPage = () => {
  const { allProducts} = useSelector((state) => state.products);
  const { allEvents, events } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const [data, setData] = useState(null);

   // Ensure the page starts at the top before rendering
   useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all events of the shop when seller ID is available
  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllEventsShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  // Use `useMemo` to compute the selected data only when dependencies change
  const selectedData = useMemo(() => {
    if (eventData !== null && allEvents) {
      return allEvents.find((item) => String(item._id) === String(id));
    }
    return ((events && events.find((item) => String(item._id) === String(id))) || (allProducts && allProducts.find((item) => String(item._id) === String(id))));
  }, [id, eventData, allEvents, events, allProducts]);

  // Update the state only when `selectedData` changes
  useEffect(() => {
    setData(selectedData);
  }, [selectedData]);

  return (
    <>
      <Header />
      <ProductDetails data={data} />
      {!eventData && data && <SuggestedProduct data={data} />}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
