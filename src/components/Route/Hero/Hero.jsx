import React from 'react'
import styles from '../../../styles/styles';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
      <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
        style={{backgroundImage:"url(https://img.freepik.com/free-psd/3d-rendering-ecommerce-background_23-2151386708.jpg?t=st=1736072127~exp=1736075727~hmac=9dafc7690ce12e78b7660c869b3cf21442aef207cbc144eb2daaa963774395a9&w=1380)", backgroundSize: "cover", backgroundPosition: "center",}}>
        <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
          <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`} >
            Best Collection for <br /> home Decoration
          </h1>
          <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
            assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
            quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
            <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
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