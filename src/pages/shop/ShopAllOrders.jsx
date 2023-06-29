import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSideBar from "../../components/shop/layout/DashboardSideBar";
import AllOrders from "../../components/shop/AllOrders";
const ShopAllOrders = () => {
  return (
    <div>
      <DashboardHeader />
      {/* sidebar */}
      <div className="flex  justify-between w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="w-full justify-center flex">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;
