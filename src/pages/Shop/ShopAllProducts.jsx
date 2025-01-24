import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar.jsx";
import AllProducts from "../../components/Shop/AllProducts.jsx"

const ShopAllProducts = () => {
  return (
        <div>
          <DashboardHeader />
          <div className="flex items-start justify-between w-full">

            <div className="800px:w-[325px]">
              <DashboardSideBar active={3} />
            </div>
            <div className="w-[83%] md:w-[68%] lg:w-[84%] pr-1">
            <AllProducts />
            </div>

          </div>
        </div>
  );
};

export default ShopAllProducts;