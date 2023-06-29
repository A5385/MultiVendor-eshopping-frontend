/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { AiOutlineMessage } from "react-icons/ai";
import Counter from "../../items/Counter";
import AddToCardBtn from "../../items/AddToCardBtn";
import AddToWishList from "../../items/AddToWishList";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../../server";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  // const [select, setSelect] = useState(false);

  const dispatch = useDispatch();

  const handleMessageSubmit = () => {};

  const incrementCounter = () => {
    setCount(count + 1);
  };
  const decrementCounter = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart ...!");
    } else {
      if (data.stock < count) {
        toast.error(`Product stock (${data.stock}) limited !`);
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully ....!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data._id, wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="fixed !w-full h-screen !top-0 !left-0 bg-[#00000030] !z-[999] flex items-center justify-center">
      <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
        {data ? (
          <>
            <RxCross1
              size={30}
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full md:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${data.images && data.images[0]}`}
                  alt=""
                />
                <br />
                <div className="flex items-center gap-3 justify-around px-4">
                  <Link
                    to={`/shop/preview/${data.shop._id}`}
                    className="flex justify-between items-center gap-5"
                  >
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      className="w-[70px] h-[70px] rounded-full object-cover"
                    />

                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className=" text-[15px]">(4.5) Ratings</h5>
                    </div>
                  </Link>
                  <div
                    className={`${styles.button}   rounded-[4px] h-11 w-[200px]`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message
                      <AiOutlineMessage size={22} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex p-5">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}
                  </h4>

                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between p-5">
                  <Counter
                    incrementCounter={incrementCounter}
                    decrementCounter={decrementCounter}
                    count={count}
                    setCount={setCount}
                  />
                  <AddToWishList
                    size="30"
                    click={click}
                    onClickRemove={() => removeFromWishlistHandler(data)}
                    onClickAdd={() => addToWishlistHandler(data)}
                  />
                </div>

                <div className=" mt-5 flex justify-between p-5 items-center">
                  <AddToCardBtn onClick={() => addToCartHandler(data._id)} />
                  <h5 className="text-[16px] text-[red] ">
                    ({data.sold_out}) Sold out
                  </h5>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetailsCard;
