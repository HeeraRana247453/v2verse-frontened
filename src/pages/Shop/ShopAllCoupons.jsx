import DashboardHeader from "../../components/Shop/Layout/DashboardHeader"
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar"
import AllCoupons from "../../components/Shop/AllCoupons.jsx";

const ShopAllCoupouns = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="800px:w-[324px]">
              <DashboardSideBar active={9} />
            </div>
            <div className="w-[83%] md:w-[68%] lg:w-[84%] justify-center flex">
                <AllCoupons />
            </div>
          </div>
    </div>
  )
}

export default ShopAllCoupouns