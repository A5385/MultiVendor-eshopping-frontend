import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSideBar from "../../components/shop/layout/DashboardSideBar";
import CreateProduct from "../../components/shop/CreateProduct";

const ShopCreateProduct = () => {
  return (
    <div>
      <DashboardHeader />
      {/* sidebar */}
      <div className="flex items-center justify-between w-full">
        <div className="w-[100px] md:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
