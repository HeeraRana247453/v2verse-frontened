// import React from 'react';
import styles from '../../styles/styles';

const CheckoutSteps = ({ active }) => {
  console.log(active);
  return (
    <div className="w-full flex justify-center mt-8 ps-3 pe-3">
      <div className="w-[90%] 800px:w-[70%] flex justify-center items-center">
        {/* Shipping */}
        <div className={`${styles.noramlFlex} flex-1`}>
          <div className={`${styles.cart_button}`}>
            <span className={`${styles.cart_button_text}`}>
                1.Shipping</span>
          </div>
          <div className={`${ active > 1 ? 'w-full h-[4px] !bg-[#f63b60]' : 'w-full h-[4px] !bg-[#FDE1E6]'}`}/>
        </div>

        {/* Payment */}
        <div className={`${styles.noramlFlex} flex-1`}>
          <div className={`${ active > 1 ? `${styles.cart_button}` : `${styles.cart_button} !bg-[#FDE1E6]`}`}>
            <span className={`${ active > 1 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
              2.Payment
            </span>
          </div>
          <div className={`${ active > 2 ? 'w-full h-[4px] !bg-[#f63b60]' : 'w-full h-[4px] !bg-[#FDE1E6]'}`}/>
        </div>

        {/* Success */}
        <div className={`${styles.noramlFlex} flex-0`}>
          <div className={`${ active > 2 ? `${styles.cart_button}` : `${styles.cart_button} !bg-[#FDE1E6]`}`}>
            <span className={`${ active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-[#f63b60]`}`}>
              3.Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
