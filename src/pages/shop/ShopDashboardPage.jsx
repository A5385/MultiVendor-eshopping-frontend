import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSideBar from "../../components/shop/layout/DashboardSideBar";

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
