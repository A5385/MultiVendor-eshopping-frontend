import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSideBar from "../../components/shop/layout/DashboardSideBar";
import AllProducts from "../../components/shop/AllProducts";

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      {/* sidebar */}
      <div className="flex  justify-between w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
