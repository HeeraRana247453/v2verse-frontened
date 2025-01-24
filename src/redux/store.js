import { configureStore } from "@reduxjs/toolkit";
import userSliceReducers from "./reducers/user";
import sellerSliceReducers from "./reducers/seller";
import productSliceReducers from "./reducers/product";
import eventSliceReducers from "./reducers/event";
import cartSliceReducers from "./reducers/cart";
import wishlistReducers from "./reducers/wishlist"
import ordersReducers from "./reducers/orders.js"

const Store = configureStore({
    reducer:{
        user:userSliceReducers,
        seller:sellerSliceReducers,
        products:productSliceReducers,
        events:eventSliceReducers,
        cart:cartSliceReducers,
        wishlist:wishlistReducers,
        order:ordersReducers
    }
});

export default Store;