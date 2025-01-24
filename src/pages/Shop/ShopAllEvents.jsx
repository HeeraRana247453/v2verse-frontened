import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllEvents from "../../components/Shop/AllEvents.jsx";

const ShopAllEvents = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-start justify-between w-full">
            <div className="800px:w-[325px]">
              <DashboardSideBar active={5} />
            </div>
            <div className="w-[83%] pr-1 md:w-[68%] lg:w-[84%]">
                <AllEvents />
            </div>
          </div>
    </div>
  )
}

export default ShopAllEvents