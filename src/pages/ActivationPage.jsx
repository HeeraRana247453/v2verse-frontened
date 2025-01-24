import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { server } from '../server';
import { MdCheckCircleOutline, MdErrorOutline } from 'react-icons/md';

const ActivationPage = () => {

    const {activation_token} = useParams();
    const [error,setError] = useState(false);

    useEffect(()=>{
        if(activation_token){
            const activationEmail = async ()=>{
                await axios.post(`${server}/user/activation`,{
                    activation_token,
                })
                .then((res)=>{
                    console.log(res);
                })
                .catch((err)=>{
                    setError(true);
                });
            };
            activationEmail();
        }
    },[activation_token]);


    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
            {error ? (
              <>
                <MdErrorOutline size={50} className="text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-red-500 mb-2">Token Expired</h1>
                <p className="text-gray-700">
                  Your token has expired. Please try creating an account again.
                </p>
              </>
            ) : (
              <>
                <MdCheckCircleOutline size={50} className="text-green-500 mb-4" />
                <h1 className="text-2xl font-bold text-green-500 mb-2">Success!</h1>
                <p className="text-gray-700">
                  Your account has been created successfully. Welcome aboard!
                </p>
              </>
            )}
          </div>
        </div>
      );
}

export default ActivationPage;