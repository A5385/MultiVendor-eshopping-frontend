import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSideBar from "../../components/shop/layout/DashboardSideBar";
import AllEvents from "../../components/shop/AllEvents";

const ShopAllEvents = () => {
  return (
    <div>
      <DashboardHeader />
      {/* sidebar */}
      <div className="flex  justify-between w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-full justify-center flex">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEvents;
