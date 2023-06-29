/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  AiOutlineCreditCard,
  AiOutlineLogout,
  AiOutlineMessage,
} from "react-icons/ai";
import { MdOutlinePassword, MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";

import { server } from "../../../server";

const SideBarItems = [
  {
    id: "1",
    icon: <RxPerson size={20} />,
    title: "Profile",
    url: "",
  },
  {
    id: "2",
    icon: <HiOutlineShoppingBag size={20} />,
    title: "Orders",
    url: "",
  },
  {
    id: "3",
    icon: <HiOutlineReceiptRefund size={20} />,
    title: "Refunds",
    url: "",
  },
  {
    id: "4",
    icon: <AiOutlineMessage size={20} />,
    title: "Inbox",
    url: "/inbox",
  },
  {
    id: "5",
    icon: <MdOutlineTrackChanges size={20} />,
    title: "Track Order",
    url: "",
  },
  {
    id: "6",
    icon: <MdOutlinePassword size={20} />,
    title: "Change Password",
    url: "",
  },
  {
    id: "7",
    icon: <TbAddressBook size={20} />,
    title: "Address",
    url: "",
  },
  {
    id: "8",
    icon: <AiOutlineLogout size={20} />,
    title: "Logout",
    url: "",
    actionlogout: true,
  },
];

const ProfileSideBar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full h-[100%] bg-white grid  shadow-sm rounded-[10px] p-4 pt-8">
      {SideBarItems &&
        SideBarItems.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => {
              item.actionlogout
                ? setActive(index) || logoutHandler()
                : setActive(index) || navigate(item.url);
            }}
          >
            <span className={`${active === index ? "text-[red]" : ""} `}>
              {item.icon}
            </span>
            <span
              className={`${
                active === index ? "text-[red]" : ""
              } pl-3 hidden md:block`}
            >
              {item.title}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ProfileSideBar;
