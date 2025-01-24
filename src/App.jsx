import React, { useEffect, useState } from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { LoginPage, SignupPage, ActivationPage,HomePage,ProductsPage,BestSellingPage,FAQPage,CheckoutPage,PaymentPage,OrderSuccessPage,ProductDetailsPage,
  ProfilePage,ShopCreatePage,SellerActivationPage,ShopLoginPage, ShopHomePage,EventsPage,UserOrderDetailPage,TrackOrderPage,UserInbox
} from './routes/Routes.js';

import { ShopDashboardPage,ShopCreateProduct,ShopAllProducts,ShopCreateEvents,ShopAllEvents,ShopAllCoupons,ShopPreviewPage,ShopAllOrders,ShopOrderDetails,ShopAllRefunds
  ,ShopSettingsPage,ShopWithDrawMoneyPage,ShopInboxPage
 } from './routes/ShopRoutes.js';

import { AdminDashboardEvents, AdminDashboardOrders, AdminDashboardPage, AdminDashboardProducts, AdminDashboardSellers, AdminDashboardUsers, AdminDashboardWithdraw } from './routes/AdminRoutes.js'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store.js';
import { loadUser } from './redux/actions/user.js';
import { loadSeller } from './redux/actions/seller.js';
import { getAllProducts } from './redux/actions/product.js';
import { getAllEvents } from './redux/actions/event.js';
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import SellerProtectedRoute from './routes/SellerProtectedRoute.jsx';
import ProtectedAdminRoute from './routes/ProtectedAdminRoute.jsx';
import ScrollToTop from "./components/ScrollToTop";

const App = () => {

  useEffect(()=>{
    Store.dispatch(loadUser());
    Store.dispatch(getAllEvents());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
  },[]);

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/sign-up' element={<SignupPage />} />
          <Route path='/activation/:activation_token' element={<ActivationPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/product/:id' element={<ProductDetailsPage />} />
          <Route path='/best-selling' element={<BestSellingPage />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/checkout' element={<ProtectedRoute> <CheckoutPage /> </ProtectedRoute>} />
          <Route path='/order/success/:id' element={<OrderSuccessPage />}/>
          <Route path='/profile' element={<ProtectedRoute> <ProfilePage/> </ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><PaymentPage/></ProtectedRoute>}/>
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          <Route path='/user/track/order/:id' element={<ProtectedRoute> <TrackOrderPage/> </ProtectedRoute>} />
          <Route path='/user/order/:id' element={<ProtectedRoute> <UserOrderDetailPage/> </ProtectedRoute>} />

          <Route path='/shop-create' element={<ShopCreatePage />} />
          <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
          <Route path='/shop-login' element={<ShopLoginPage />} />
          <Route path='/shop/:id' element={<SellerProtectedRoute><ShopHomePage/></SellerProtectedRoute>} />
          <Route path='/dashboard' element={<SellerProtectedRoute><ShopDashboardPage/></SellerProtectedRoute>} />
          <Route path='/dashboard-create-product' element={<SellerProtectedRoute><ShopCreateProduct/></SellerProtectedRoute>} />
          <Route path='/dashboard-products' element={<SellerProtectedRoute><ShopAllProducts/></SellerProtectedRoute>} />
          <Route path='/dashboard-create-event' element={<SellerProtectedRoute><ShopCreateEvents/></SellerProtectedRoute>} />
          <Route path='/dashboard-events' element={<SellerProtectedRoute><ShopAllEvents/></SellerProtectedRoute>} />
          <Route path='/dashboard-coupons' element={<SellerProtectedRoute><ShopAllCoupons/></SellerProtectedRoute>} />
          <Route path='/dashboard-orders' element={<SellerProtectedRoute><ShopAllOrders/></SellerProtectedRoute>} />
          <Route path='/order/:id' element={<SellerProtectedRoute><ShopOrderDetails /></SellerProtectedRoute>} />
          <Route path='/dashboard-refunds' element={<SellerProtectedRoute><ShopAllRefunds /></SellerProtectedRoute>} />
          <Route path='/settings' element={<SellerProtectedRoute><ShopSettingsPage /></SellerProtectedRoute>} />
          <Route path='/dashboard-withdraw-money' element={<SellerProtectedRoute><ShopWithDrawMoneyPage /></SellerProtectedRoute>} />
          <Route path='/dashboard-messages' element={<SellerProtectedRoute><ShopInboxPage /></SellerProtectedRoute>} />
          <Route path="/inbox" element={<ProtectedRoute> <UserInbox /> </ProtectedRoute>}/>
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboardPage /></ProtectedAdminRoute>}/>
          <Route path="/admin-users" element={<ProtectedAdminRoute><AdminDashboardUsers /></ProtectedAdminRoute>}/>
          <Route path="/admin-sellers" element={<ProtectedAdminRoute><AdminDashboardSellers /></ProtectedAdminRoute>}/>
          <Route path="/admin-orders" element={<ProtectedAdminRoute><AdminDashboardOrders /></ProtectedAdminRoute>}/>
          <Route path="/admin-products" element={<ProtectedAdminRoute><AdminDashboardProducts /></ProtectedAdminRoute>}/>
          <Route path="/admin-events" element={<ProtectedAdminRoute><AdminDashboardEvents /></ProtectedAdminRoute>}/>
          <Route path="/admin-withdraw-request" element={<ProtectedAdminRoute><AdminDashboardWithdraw /></ProtectedAdminRoute>}/>
          
        </Routes>
        <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss
          draggable pauseOnHover theme="dark"
          // transition={Bounce}
        />
      </BrowserRouter>
    </>
  )
}

export default App