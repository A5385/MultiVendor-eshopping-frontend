/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "../../../styles/styles";

import { AiOutlineMessage } from "react-icons/ai";

import Counter from "../../items/Counter";
import AddToWishList from "../../items/AddToWishList";
import AddToCardBtn from "../../items/AddToCardBtn";
import Ratings from "../../../components/website/Products/Ratings";

import { backend_url } from "../../../server";

import { getAllProductsShop } from "../../../redux/actions/product";
import { addToCart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";

// eslint-disable-next-line react/prop-types
const ProductDetails = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, dispatch, wishlist]);

  const incrementCounter = () => {
    setCount(count + 1);
  };
  const decrementCounter = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleMessageSubmit = () => {
    navigate("/index?conversation=507ebjver884ehfdjeriv84");
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart ...!");
    } else {
      if (data.stock < 1) {
        toast.error(`Product stock (${data.stock}) limited !`);
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully ....!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const averageRating = totalRatings / totalReviewsLength;

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-white">
      {/* product details */}
      {data ? (
        <div className={`unset ${styles.section} w-[90%] 800px:w-[80%]  `}>
          <div className="w-full py-5">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* image section */}

              <div className="w-full py-5">
                <img
                  src={`${backend_url}${data && data.images[select]}`}
                  alt={data.name}
                  className="w-[80%] mx-auto"
                />

                <div className="w-full h-fit gap-3 grid grid-cols-2 md:grid-cols-3">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        key={index}
                        className={`${
                          select === index ? "border" : "null"
                        } cursor-pointer w-full`}
                      >
                        <img
                          src={`${backend_url}${i}`}
                          alt=""
                          className="w-full overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* description section */}
              <div className="w-full flex flex-col  justify-around">
                <div>
                  <div>
                    <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                    <p>{data.description}</p>
                    {/* price section */}
                    <div className="flex pt-3">
                      <h4 className={`${styles.productDiscountPrice}`}>
                        {data.discount_price} $
                      </h4>
                      <h3 className={`${styles.price}`}>
                        {data.originalPrice ? data.originalPrice + "$" : null}
                      </h3>
                    </div>
                  </div>

                  {/* counter section and wishlist*/}
                  <div
                    className={`flex mt-12 h-[50px] item-center justify-between  mb-5 pr-3`}
                  >
                    <Counter
                      incrementCounter={incrementCounter}
                      decrementCounter={decrementCounter}
                      count={count}
                      setCount={setCount}
                    />
                    {/* Add to cart button */}

                    {/* Add to wishlist */}
                    <AddToWishList
                      click={click}
                      size={30}
                      onClickRemove={() => removeFromWishlistHandler(data)}
                      onClickAdd={() => addToWishlistHandler(data)}
                    />
                  </div>
                  <AddToCardBtn onClick={() => addToCartHandler(data._id)} />
                </div>

                {/* seller section */}
                <div className="flex flex-col s:flex-row items-center justify-between pt-8 gap-4 ">
                  <Link to={`/shop/preview/${data.shop._id}`}>
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt="shopimage"
                      className="!w-[120px] rounded-full object-contain"
                    />
                  </Link>

                  <div className=" ">
                    <h3 className={`${styles.shop_name}  `}>
                      {data.shop.name}
                    </h3>

                    <h5 className="pb-3 text-[15px]">
                      ({averageRating}/5) Ratings
                    </h5>
                  </div>

                  <div className={`${styles.button} bg-[#6443d1]  rounded `}>
                    <span
                      className="text-white flex items-center"
                      onClick={handleMessageSubmit}
                    >
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* product details info */}
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 md:px-10 py-2 rounded  ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        {/* product details tab */}
        <div className="relative">
          <h5
            className="text-black text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>

        {/* product reviews tab */}
        <div className="relative">
          <h5
            className="text-black text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>

        {/* seller information tab */}
        <div className="relative">
          <h5
            className="text-black text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
      </div>
      {/* product details body */}
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}
      {/* product reviews body */}
      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2 mt-3" key={index}>
                <img
                  className="w-[60px] h-[60px] rounded-full"
                  src={`${backend_url}/${item.user.avatar}`}
                  alt="user-image"
                />
                <div>
                  <div className="w-full flex gap-3 items-center">
                    <h1 className="pl-3 font-[500]">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p className="pl-3 ">{item.comment}</p>
                </div>
              </div>
            ))}
          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product</h5>
            )}
          </div>
        </div>
      ) : null}
      {/* seller infomation */}
      {active === 3 ? (
        <div className="w-full block md:flex p-5">
          {/* left-side */}
          <div className="w-full md:w-[50%] ">
            <div className="flex items-center">
              <img
                src={`${backend_url}${data?.shop?.avatar}`}
                alt={data.name}
                className="w-60 h-60 rounded-full object-contain"
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  ({averageRating}/5) Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2">{data.shop.description}</p>
          </div>
          {/* right0side */}
          <div className="w-full md:w-[50%]  mt-5 md:mt-0 md:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600] ">
                Joined on: <span> {data.shop.createdAt.slice(0, 10)}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products: <span>{products && products.length}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews: <span>{totalReviewsLength}</span>
              </h5>
              <Link to={`/shop/${data.shop?._id}`}>
                <div className={`${styles.button} rounded-md h-[39.5px] mt-3`}>
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
