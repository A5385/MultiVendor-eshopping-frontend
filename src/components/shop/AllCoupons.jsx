import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineDelete,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { FiGift, FiPercent } from "react-icons/fi";

import Loader from "../website/layout/Loader";
import styles from "../../styles/styles";
import InputField from "../items/InputField";
import InputSelectField from "../items/InputSelectField";
import { server } from "../../server";

const AllCoupons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState("");

  const { products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [seller._id]);

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success("Coupon code deleted successfully!");
      });
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 p-4 mt-10 bg-white cursor-pointer">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-md mb-4`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[90%] md:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
                <div className="w-full flex justify-end">
                  <RxCross1
                    className="cursor-pointer"
                    size={25}
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Create Coupon Code
                </h5>
                {/* create coupon code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <div className="w-full pt-5 grid grid-cols-1  gap-4">
                    {/* product Name */}
                    <InputField
                      label="Coupon Code Name"
                      type="text"
                      id="name"
                      require={true}
                      icon={<FiGift />}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {/* discount percentage */}
                    <InputField
                      label="Discount Percentage"
                      type="number"
                      id="discount-percentage"
                      require={true}
                      icon={<FiPercent />}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    {/*  minAmount */}
                    <InputField
                      label="Min Amount"
                      type="number"
                      id="min-amount"
                      require={false}
                      icon={<AiOutlineArrowDown />}
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                    />
                    {/*  maxAmount */}
                    <InputField
                      label="Max Amount"
                      type="number"
                      id="max-amount"
                      require={false}
                      icon={<AiOutlineArrowUp />}
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                    />
                    {/* Category */}
                    <InputSelectField
                      value={selectedProducts}
                      data={products}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                      placeholder="Choose product"
                    />
                    <input
                      type="submit"
                      value="Create Coupon"
                      className="mt-2 cursor-pointer appearance-none text-center  w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
