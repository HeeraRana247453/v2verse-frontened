import React from 'react'
import styles from '../../../styles/styles';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
      <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
        style={{backgroundImage:"url(https://res.cloudinary.com/dmvmebkrr/image/upload/v1738254853/HeroSectionBanner_suig0d.avif)", backgroundSize: "cover", backgroundPosition: "center",}}>
        <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
          <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
            Discover the Finest <br /> Home Decor Collections
          </h1>

          <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
            Elevate your living space with unique, high-quality decor from top sellers.  
            Find stunning pieces that blend style, comfort, and elegance, all in one place. <br />  
            Shop now and create a home that truly reflects your personality!
          </p>

          <Link to="/products" className="inline-block">
              <div className={`${styles.button} mt-5`}>
                   <span className="text-[#fff] font-[Poppins] text-[18px]">Shop Now</span>
              </div>
          </Link>
        </div>
      </div>
    );
  };
  
  export default Hero;