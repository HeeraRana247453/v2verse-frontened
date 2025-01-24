import React, { useEffect } from 'react'
import Signup from '../components/Signup/Signup'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignupPage = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((store) => store.user);
    useEffect(() => {
        if(isAuthenticated === true){
            navigate("/");
        }
    }, [isAuthenticated]);
    
  return (
    <div>
        <Signup/>
    </div>
  )
}

export default SignupPage