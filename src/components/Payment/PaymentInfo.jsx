import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";


const PaymentInfo = ({user,open,setOpen,onApprove,createOrder,paymentHandler,cashOnDeliveryHandler,}) => {
    const [select, setSelect] = useState(1);
  
    return (
      <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">

        {/*1) Razorpay payment */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center" onClick={() => setSelect(2)}>
              {select === 1 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" /> ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">Pay with Razorpay</h4>
          </div>
  
          {select === 1 ? (
            <div className="w-full flex border-b">
              <div className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`} onClick={paymentHandler}>
                Pay Now
              </div>
            </div>
          ) : null}
        </div>
        <br />

        {/*2) Paypal payment */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center" onClick={() => setSelect(2)}>
              {select === 2 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" /> ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">Pay with Paypal</h4>
          </div>
  
          {select === 2 ? (
            <div className="w-full flex border-b">
              <div className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`} onClick={() => setOpen(true)}>
                Pay Now
              </div>
              {open && (
                <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                  <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                    <div className="w-full flex justify-end p-3">
                      <RxCross1 size={30} className="cursor-pointer absolute top-3 right-3" onClick={() => setOpen(false)}/>
                    </div>
                      <PayPalScriptProvider options={{ "client-id": "AaHtWreNKtjGJJdC0xLnuWccpBQL4YHaryPNpvPeOSp4_HPkei288r5pAFw31GxOw_iore6S4CiLo8f5",}}>
                        <PayPalButtons style={{ layout: "vertical" }} onApprove={onApprove} createOrder={createOrder}/>
                      </PayPalScriptProvider>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
        <br />

        {/*3) Cash on delivery */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center" onClick={() => setSelect(3)}>
              {select === 3 ? (<div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">Cash on Delivery</h4>
          </div>
  
          {select === 3 ? (
            <div className="w-full flex">
              <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                <input type="submit" value="Confirm" className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}/>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  export default PaymentInfo;