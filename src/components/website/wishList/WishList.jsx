/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { RxCross1, RxTrash } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

import styles from "../../../styles/styles";
import { backend_url } from "../../../server";
import { addToCart } from "../../../redux/actions/cart";
import { removeFromWishlist } from "../../../redux/actions/wishlist";

const WishList = ({ setOpenWishList, data }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-screen w-[30%] bg-white flex flex-col justify-between shadow-lg overflow-y-scroll">
        {!data.length ? (
          <div className="w-full h-screen flex items-center justify-center ">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3 ">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            <h5>Cart items is empty !</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5 ">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishList(false)}
                />
              </div>
              {/* Items length */}
              <div className={`${styles.noramlFlex} p-4 `}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-5 text-[20px] font-[500]">
                  {" "}
                  {data && data.length} {data.length > 1 ? "items" : "item"}
                </h5>
              </div>
              {/* cart single items */}
              <br />
              <div className="w-full-border-t ">
                {data &&
                  data.map((i, index) => <CartSingle key={index} data={i} />)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart ...!");
    } else {
      if (data.stock < 1) {
        toast.error(`Product stock (${data.stock}) limited !`);
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully ....!");
      }
    }
  };

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };
  return (
    <div className="border-y p-4">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-[20px]">
            <RxTrash
              size={30}
              className="cursor-pointer"
              onClick={() => removeFromWishlistHandler(data)}
            />
          </div>
          <img
            src={`${backend_url}${data?.images[0]}`}
            alt={`product ${data.name}`}
            className="w-[60px] h-[60px] ml-2"
          />
          <div className="px-[15px]">
            <h1>{data.name}</h1>

            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              US ${data.discountPrice}
            </h4>
          </div>
        </div>
        <div>
          <BsCartPlus
            size="30"
            className="cursor-pointer pl-2"
            title="Add to cart"
            onClick={() => addToCartHandler(data._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default WishList;
