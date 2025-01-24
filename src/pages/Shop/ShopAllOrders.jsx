import DashboardHeader from "../../components/Shop/Layout/DashboardHeader"
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar"
import AllOrders from "../../components/Shop/AllOrders.jsx"


const ShopAllOrders = () => {
    return (
          <div>
              <DashboardHeader />
              <div className="flex justify-between w-full">
                  <div className="800px:w-[324px]">
                    <DashboardSideBar active={2} />
                  </div>
                  <div className="w-[83%] sm:w-[83%] 800px:w-[69%] lg:w-[84%] justify-center flex pr-2 sm:pr-5">
                     <AllOrders />
                  </div>
                </div>
          </div>
    )
  }
  
  export default ShopAllOrders