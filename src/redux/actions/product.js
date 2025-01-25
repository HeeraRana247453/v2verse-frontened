import axios from "axios";
import { server } from "../../server";
import {
  productCreateRequest,productCreateSuccess,productCreateFail,
  getAllProductsShopRequest,getAllProductsShopSuccess,getAllProductsShopFailed,
  deleteProductRequest,deleteProductSuccess,deleteProductFailed,
  getAllProductsRequest,getAllProductsSuccess,getAllProductsFailed,
} from "../reducers/product";

// Create a product
export const createProduct = ({name,description,category,tags,originalPrice,discountPrice,stock,shopId,images}) => async (dispatch) => {
                try {
                    dispatch(productCreateRequest());
                    console.log("shop id: ",shopId," Product Name: ",name);//debugging code
                    const { data } = await axios.post(`${server}/product/create-product`,{
                        name,
                        description,
                        category,
                        tags,
                        originalPrice,
                        discountPrice,
                        stock,
                        shopId,
                        images,
                    }
                    );
                    dispatch(productCreateSuccess(data.product));
                } 
                catch (error) {
                    dispatch(productCreateFail(error.response?.data?.message || "Error"));
                }
};

// Get all products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAllProductsShopRequest());
    console.log("getAllProductsShop called")

    const { data } = await axios.get(`${server}/product/get-all-products-shop/${id}`);

    dispatch(getAllProductsShopSuccess(data.products));
  } catch (error) {
    dispatch(getAllProductsShopFailed(error.response?.data?.message || "Error"));
  }
};

// Delete a product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());

    const { data } = await axios.delete(`${server}/product/delete-shop-product/${id}`,{ withCredentials: true });

    dispatch(deleteProductSuccess(data.message));
  } catch (error) {
    dispatch(deleteProductFailed(error.response?.data?.message || "Error"));
  }
};

// Get all products
export const getAllProducts = () => async (dispatch) => {
    console.log("getAllProducts called!");
  try {
    dispatch(getAllProductsRequest());

    const { data } = await axios.get(`${server}/product/get-all-products`);
    
    console.log("get all products successfully!!!");

    dispatch(getAllProductsSuccess(data.products));
  } catch (error) {
    dispatch(getAllProductsFailed(error.response?.data?.message || "Error"));
  }
};
