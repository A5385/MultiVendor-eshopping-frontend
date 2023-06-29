/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import styles from "../../../styles/styles";

import logo from "../../../assets/Ebtkar 2022 V3.0-01.png";

import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";

import DropDown from "./DropDown";
import Navbar from "./Navbar";

import Cart from "../cart/Cart";
import WishList from "../wishList/WishList";
import ProfileImage from "../../../components/user/profile/ProfileImage";
import SearchData from "../../../components/items/SearchData";
import BecomeSellerBtn from "../../../components/items/BecomeSellerBtn";

import { categoriesData } from "../../../static/data";
import { backend_url } from "../../../server";

const Header = ({ activeHeading }) => {
  const { allProducts } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className="hidden md:block">
        <div className={`${styles.section} w-full`}>
          <div className=" flex md:h-[70px] w-[92%] mx-auto md:my-[20px] md:flex items-center justify-between">
            <div className="w-[20%]">
              <Link to="/">
                <img src={logo} alt="" className="w-full" />
              </Link>
            </div>

            {/* search box */}
            <div className=" w-[40%] md:w-[50%] relative">
              <input
                type="text"
                placeholder="Search Product..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
              />
              <AiOutlineSearch
                size={25}
                className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
              />

              {searchData && searchData.length !== 0 ? (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4 ">
                  {searchData &&
                    searchData.map((i) => (
                      <Link to={`/product/${i._id}`} key="">
                        <div className="w-full flex items-start py-3  hover:scale-105 hover:bg-slate-200 duration-300">
                          <img
                            src={`${backend_url}${i.images[0]}`}
                            alt=""
                            className="w-[40px] h-[40] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    ))}
                </div>
              ) : null}
            </div>
            <BecomeSellerBtn />
          </div>

          <div
            className={`${
              active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
            } transition-300 flex  800px:flex items-center justify-between w-full bg-blue-700 `}
          >
            <div
              className={`w-[92%] mx-auto relative flex gap-5 items-center  justify-between  `}
            >
              {/* categories */}
              <div onClick={() => setDropDown(!dropDown)}>
                <div className="relative h-[40px]  w-[270px] mt-5 lg:block">
                  <BiMenuAltLeft
                    size={30}
                    className="absolute top-[50%] translate-y-[-50%] left-4"
                  />
                  <button
                    className={`h-[100%] w-full flex justify-between items-center pl-[70px] bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                  >
                    All Categories
                  </button>
                  <IoIosArrowDown
                    size={20}
                    className="absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer"
                  />
                  {dropDown ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.75 }}
                    >
                      <DropDown
                        categoriesData={categoriesData}
                        setDropDown={setDropDown}
                        dropDown={dropDown}
                      />
                    </motion.div>
                  ) : null}
                </div>
              </div>

              {/* nav items */}
              <div className={`${styles.noramlFlex} w-[40%] md:w-[50%] `}>
                <Navbar active={activeHeading} />
              </div>

              {/* notifications */}
              <div className={`${styles.noramlFlex}`}>
                {/* wishlist */}
                <div
                  className="relative cursor-pointer mr-[15px] "
                  onClick={() => setOpenWishList(true)}
                >
                  <AiOutlineHeart size={30} color="white" />
                  <div className="absolute -right-2 -top-2 rounded-full bg-teal-600 w-5 h-5  text-white text-[14px] flex justify-center items-center  border-[1px] border-white">
                    <span>{wishlist && wishlist.length}</span>
                  </div>
                </div>

                {/* shopping card */}
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenCart(true)}
                >
                  <AiOutlineShoppingCart size={30} color="white" />
                  <div className="absolute -right-2 -top-2 rounded-full bg-teal-600 w-5 h-5  text-white text-[14px] flex justify-center items-center  border-[1px] border-white">
                    <span> {cart && cart.length}</span>
                  </div>
                </div>

                {/* profile */}
                <div className="relative cursor-pointer mr-[15px]">
                  <>
                    {isAuthenticated ? (
                      <Link to="/profile">
                        <ProfileImage
                          height="40px"
                          width="40px"
                          rounded="full"
                          style={`object-cover`}
                        />
                      </Link>
                    ) : (
                      <Link to="/login">
                        <CgProfile size={30} color="white" />
                      </Link>
                    )}
                  </>
                </div>
              </div>

              {/* Cart popup */}
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

              {/* wishlist popup */}
              {openWishList ? (
                <WishList data={wishlist} setOpenWishList={setOpenWishList} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-md fixed top-0 left-0 z-10" : null
        } w-full h-[70px] fixed bg-white z-50 top-0 left-0 shadow-sm md:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>

          <div>
            <Link to="/">
              <img
                src={logo}
                alt=""
                className="my-5 pr-3 cursor-pointer w-[200px]"
              />
            </Link>
          </div>
          <div>
            <div className="relative mr-5">
              <AiOutlineShoppingCart size={30} />
              <span className="absolute -right-2 -top-2 rounded-full bg-teal-600 w-5 h-5 p-0 m-0 text-white text-[14px] leading-tight text-center ">
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[60%] bg-white h-screen top-0 left-0 z-10">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-3.5">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute -right-2 -top-2 rounded-full bg-teal-600 w-5 h-5 p-0 m-0 text-white text-[14px] leading-tight text-center ">
                      0
                    </span>
                  </div>
                </div>

                <RxCross1
                  size={25}
                  className="mr-3 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 w-[92%] m-auto h-[40%]">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                />
                <SearchData searchData={searchData} />
                <Navbar active={activeHeading} />
                <div className="mt-8">
                  <BecomeSellerBtn />
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="flex gap-2 w-full justify-center">
                  {!isAuthenticated ? (
                    <>
                      <Link
                        to="/login"
                        className="text-[18px] text-[#000000b7]"
                      >
                        Login /
                      </Link>
                      <Link
                        to="/register"
                        className="text-[18px] text-[#000000b7]"
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      {isAuthenticated ? (
                        <Link to="/profile">
                          <ProfileImage
                            height="60px"
                            width="60px"
                            rounded="full"
                            style={`object-cover border-[3px] border-[#3ad132] `}
                          />
                        </Link>
                      ) : (
                        <Link to="/login">
                          <CgProfile size={30} color="white" />
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
