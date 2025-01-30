import React from 'react'
import styles from '../../styles/styles'
import { navItems } from '../../static/data'
import { Link } from 'react-router-dom'

const Navbar = ({ active, mobile }) => {
  return (
    <div className={`${mobile ? "flex flex-col items-start ml-5 gap-5 mb-9" : "flex items-center space-x-11"}`}>
      {navItems?.map((item, index) => (
        <Link
          key={index}
          to={item.url}
          className={`relative font-medium text-lg ${mobile ? "":"px-2"} transition-all duration-300 ${active === index + 1 ? "text-green-400" : mobile ? "text-black" : "text-white"} hover:text-green-400 hover:scale-105`}>
          {item.title}
          {/* Underline Animation */}
          <span className={`absolute left-0 bottom-0 w-full rounded-md h-[2px] bg-green-400 scale-x-0 transition-transform duration-300 ease-in-out
            ${active === index + 1 ? "scale-x-100" : "group-hover:scale-x-100"}`}></span>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;