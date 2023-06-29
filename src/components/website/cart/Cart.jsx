/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { RxCross1, RxTrash } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";

import styles from "../../../styles/styles";
import { backend_url } from "../../../server";
import { addToCart, removeFromCart } from "../../../redux/actions/cart";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 ">
      <div className="fixed top-0 right-0 h-screen w-[30%] bg-white flex flex-col justify-between shadow-lg">
        {!cart.length ? (
          <div className="w-full h-screen flex items-center justify-center ">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3 ">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart items is empty !</h5>
          </div>
        ) : (
          <>
            <div className="overflow-y-scroll">
              <div className="flex w-full justify-end pt-5 pr-5 ">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* Items length */}
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-5 text-[20px] font-[500]">
                  {cart && cart.length} {cart.length > 1 ? "items" : "item"}
                </h5>
              </div>
              {/* cart single items */}
              <br />
              <div className="w-full-border-t ">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-white text-[18px] font-[600]">
                    Checkout Now ({totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock <= value) {
      toast.error(`Product stock (${data.stock}) limited !`);
    } else {
      setValue(value + 1);
      const updateCartData = {
        ...data,
        qty: value + 1,
      };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-y p-4">
      <div className="w-full flex items-center justify-between gap-3">
        <div className="flex items-center justify-start gap-2">
          <div className="flex flex-col gap-[2px]">
            {/* increase button */}
            <div
              className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
              onClick={() => increment(data)}
            >
              <HiPlus size={25} color="white" />
            </div>

            {/* amount */}
            <span className="pl-[8px]  text-[16px] font-[700]">{value}</span>
            {/* decrease button */}
            <div
              className="bg-[#1f1d1d4f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={16} color="#ffffff " />
            </div>
          </div>

          <div className="flex items-center justify-start ">
            <img
              src={`${backend_url}${data?.images[0]}`}
              alt=""
              className="w-[80px] h-[80px] ml-2"
            />
            <div className="pl-[5px]">
              <h1>{data.name}</h1>
              <h4 className="font-[600] text-[15px] text-[#00000082]">
                ${data.discountPrice} * {value}
              </h4>
              <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
                US ${totalPrice}
              </h4>
            </div>
          </div>
        </div>
        <div className="w-[20px]">
          <RxTrash
            size={25}
            className=" cursor-pointer "
            onClick={() => removeFromCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
