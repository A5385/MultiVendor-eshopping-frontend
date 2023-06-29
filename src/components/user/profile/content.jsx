/* eslint-disable no-unused-vars */
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import axios from "axios";

import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineKey,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

import styles from "../../../styles/styles";
import { server } from "../../../server";
import {
  deleteUserAddress,
  updateUserAddress,
} from "../../../redux/actions/user";
import InputField from "../../items/InputField";
import { getAllOrdersOfUser } from "../../../redux/actions/orders";
import { MdTrackChanges } from "react-icons/md";

export function AllOrders() {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: "fit-content", flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 300,
      flex: 0.7,
      cellClassName: "Delivered",
    },
    {
      field: "shop",
      headerName: "Shop",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 75,
      // flex: 1,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      // flex: 1,
    },

    {
      field: " ",
      // flex: 1,
      minWidth: 50,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
        shop: item.cart[0].shop.name,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
}

export const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: "Delivered",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

export const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: "Delivered",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt="visa"
          />
          <h5 className="pl-5 font-[600]">Ahmed Khaled</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** **** ****</h6>
          <h5 className="pl-6">08/2023</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export const ChangePassword = () => {
  const [visible, setVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmNewPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full px-5">
      <h1 className="text-[25px] text-center  font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className=" w-full flex mt-10">
        <form
          aria-required
          className="mx-auto w-[50%] flex flex-col gap-5 items-center"
          onSubmit={passwordChangeHandler}
        >
          {/* old password */}
          <InputField
            isPassword={true}
            label="Old Password"
            type="password"
            id="old-password"
            require={true}
            icon={<AiOutlineKey />}
            value={oldPassword}
            visible={visible}
            setVisible={setVisible}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {/* New password */}
          <InputField
            isPassword={true}
            label="New Password"
            type="password"
            id="new-password"
            require={true}
            icon={<AiOutlineKey />}
            value={newPassword}
            visible={visible}
            setVisible={setVisible}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {/* confirm New password */}
          <InputField
            isPassword={true}
            label="Confirm New Password"
            type="password"
            id="confirm-password"
            require={true}
            icon={<AiOutlineKey />}
            value={confirmNewPassword}
            visible={visible}
            setVisible={setVisible}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <input
            type="submit"
            value="Change Password"
            required
            className="w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-md  cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export const Address = () => {
  const [open, setOpen] = useState(false);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the field!");
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
    navigate("/profile");
    window.location.reload();
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>

            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full  p-4 flex flex-col gap-4 ">
                  {/* Country */}
                  <div className="w-full ">
                    <select
                      name=""
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border h-[57px] rounded-md p-2 mx-auto"
                    >
                      <option value="" className="block pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* City */}
                  <div className="w-full">
                    <select
                      name=""
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border h-[57px] rounded-md p-2 mx-auto"
                    >
                      <option value="" className="block pb-2">
                        Choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Address 1 */}
                  <InputField
                    label="Address 1"
                    type="address"
                    id="address1"
                    require={true}
                    icon={<pin />}
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                  {/* Address 1 */}
                  <InputField
                    label="Address 2"
                    type="address"
                    id="address2"
                    require={false}
                    icon={<pin />}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                  {/* Zip Code */}
                  <InputField
                    label="Zip code"
                    type="number"
                    id="zipCode"
                    require={false}
                    icon={<pin />}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                  {/* Address Type */}
                  <div className="w-full">
                    <select
                      name=""
                      id="address-type"
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-full border h-[57px] rounded-md p-2 mx-auto"
                    >
                      <option value="" className="block pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item, index) => (
                          <option
                            className="block pb-2"
                            key={index}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* submit btn */}
                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff]" onClick={() => setOpen(true)}>
            Add New
          </span>
        </div>
      </div>

      <br />

      {user &&
        user.addresses.map((item, index) => (
          <>
            <div
              className="w-full bg-white h-min flex rounded-md items-center p-5 shadow justify-between mb-5 hover:shadow-md gap-5 hover:translate-y-1"
              key={index}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center  gap-5">
                <div className="w-min flex justify-start">
                  <h5
                    className={`px-4 py-2 font-[600] rounded-md text-center
                  ${
                    item.addressType === "Default"
                      ? "bg-blue-300"
                      : item.addressType === "Home"
                      ? "bg-green-300"
                      : item.addressType === "Office" && "bg-red-300"
                  }`}
                  >
                    {item.addressType}
                  </h5>
                </div>

                <div className="w-full flex justify-start ">
                  <h6>
                    {item.address1} {item.address2}
                  </h6>
                </div>

                <div className=" w-full flex justify-start ">
                  <h6 className=""> {user && user.phone}</h6>
                </div>
              </div>
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};
