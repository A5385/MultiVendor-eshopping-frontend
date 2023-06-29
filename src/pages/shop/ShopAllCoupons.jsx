import React from "react";
import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSideBar from "../../components/shop/layout/DashboardSideBar";
import AllCoupons from "../../components/shop/AllCoupons";

const ShopAllCoupons = () => {
  return (
    <div>
      <DashboardHeader />
      {/* sidebar */}
      <div className="flex  justify-between w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupons;
