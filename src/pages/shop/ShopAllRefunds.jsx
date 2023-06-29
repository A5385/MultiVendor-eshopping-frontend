import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSideBar from "../../components/shop/layout/DashboardSideBar";

import AllRefundsOrders from "../../components/shop/AllRefundsOrders.jsx";

const ShopAllRefunds = () => {
  return (
    <div>
      <DashboardHeader />
      {/* sidebar */}
      <div className="flex  justify-between w-full">
        <div className="w-[100px] md:w-fit ">
          <DashboardSideBar active={10} />
        </div>
        <div className="w-full justify-center flex">
          <AllRefundsOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefunds;
