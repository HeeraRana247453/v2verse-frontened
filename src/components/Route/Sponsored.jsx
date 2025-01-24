import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}>
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img src="https://res.cloudinary.com/dmvmebkrr/image/upload/v1736101849/sponser1_ukp0jy.png" style={{width:"250px",paddingTop:"14px", objectFit:"contain"}} alt=""/>
        </div>
        <div className="flex items-start">
          <img src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png" alt="" style={{width:"150px", objectFit:"contain"}}/>
        </div>
        <div className="flex items-start">
          <img src="https://res.cloudinary.com/dmvmebkrr/image/upload/v1736102819/sponser2_xkbcwu.png" style={{width:"158px",paddingTop:"20px", objectFit:"contain"}} alt=""/>
        </div>
        <div className="flex items-start">
          <img src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png" style={{width:"140px", objectFit:"contain"}} alt="" />
        </div>
        <div className="flex items-start">
          <img src="https://res.cloudinary.com/dmvmebkrr/image/upload/v1736102828/sponser3_kki1ex.png"
            style={{width:"198px",paddingTop:"10px", objectFit:"contain"}} alt=""/>
        </div>
      </div>
    </div>
  );
};

export default Sponsored;