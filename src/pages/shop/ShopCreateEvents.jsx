import React from "react";
import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSideBar from "../../components/shop/layout/DashboardSideBar";
import CreateEvent from "../../components/shop/CreateEvent";

const ShopCreateEvents = () => {
  return (
    <div>
      <DashboardHeader />
      {/* sidebar */}
      <div className="flex  justify-between w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvents;
