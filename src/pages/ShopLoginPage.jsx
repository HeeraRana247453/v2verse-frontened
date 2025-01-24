import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import Loader from '../components/Layout/Loader.jsx';

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller,isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if(isSeller === true){
      navigate(`/dashboard`); //in aap.jsx
    }
  }, [isLoading,isSeller]);

  if(isLoading){
    return <Loader/>
  }

  return (
    <div>
        <ShopLogin />
    </div>
  )
}

export default ShopLoginPage