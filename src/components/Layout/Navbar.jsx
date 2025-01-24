import React from 'react'
import styles from '../../styles/styles'
import { navItems } from '../../static/data'
import { Link } from 'react-router-dom'

const Navbar = ({active,mobile}) => {
  return (
    <div className={mobile ? `flex-col`:`${styles.noramlFlex}`}>
        {
            navItems && navItems.map((i,index)=>
                <div className={mobile ? `mb-4`: 'flex'} key={index}>
                    <Link to={i.url} className={`${active===index+1 ? "text-[#17dd1f]" : mobile ? `text-[#0000000]` : `text-[#ffff]`} font-[500] px-6 cursor-pointer`} >
                    {i.title}</Link>
                </div>
            )
        }
    </div>
  )
}

export default Navbar;