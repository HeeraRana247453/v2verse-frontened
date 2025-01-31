import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div className={`${styles.section} bg-white sm:py-10 py-1 px-5 mb-12 cursor-pointer rounded-xl`}>
      <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-5 sm:gap-6 gap-3 place-items-center">
        <img 
          src="https://res.cloudinary.com/dmvmebkrr/image/upload/v1736101849/sponser1_ukp0jy.png" 
          className="h-[60px] sm:h-[60px] object-contain" 
          alt="Sponsor 1" 
        />
        <img 
          src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png" 
          className="h-[50px] sm:h-[60px] object-contain" 
          alt="Sony" 
        />
        <img 
          src="https://res.cloudinary.com/dmvmebkrr/image/upload/v1736102819/sponser2_xkbcwu.png" 
          className="h-[60px] sm:h-[60px] object-contain" 
          alt="Sponsor 2" 
        />
        <img 
          src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png" 
          className="h-[20px] sm:h-[60px] object-contain" 
          alt="Dell" 
        />
        <img 
          src="https://res.cloudinary.com/dmvmebkrr/image/upload/v1736102828/sponser3_kki1ex.png" 
          className="h-[60px] sm:h-[60px] object-contain" 
          alt="Sponsor 3" 
        />
      </div>
    </div>
  );
};


export default Sponsored;